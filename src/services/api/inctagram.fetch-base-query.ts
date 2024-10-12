import { inctagramApi } from '@/services'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import Router from 'next/router'

import { PATH } from '../../shared/utils/pathVariables'

/*
 * Как начать работать с Automatic re-authorization by extending fetchBaseQuery?
 * 1. взять готовый код из документации:
 *    https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
 * 2. устанавливаем mutex - $ pnpm i async-mutex
 *
 * */

/* 🟣 будем делать запрос за access-token => нужен тип ответа от сервера */
type UpdateTokenResponseType = {
  data: { accessToken: string }
}

/* 🟡 Mutex используется для синхронизации доступа к общим ресурсам в многопоточной среде. В контексте JavaScript и веб-приложений
       это может использоваться для предотвращения одновременного выполнения определенных операций,например, обновления токенов.
       что делает mutex? => если упадут несколько завпросов, то логика будет оправлять НЕСКОЛЬКО запросов на обновление токена,
       mutex допускает один запрос на обновление token, остальные блокирует */
const mutex = new Mutex()

/* 🟢 baseQuery базовая настрока request with headers, [ используется в baseQueryWithReauth ] */
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL ?? 'https://inctagram.work/api',

  /* сохраняем refresh-token в cookies автоматически */
  credentials: 'include',

  prepareHeaders: headers => {
    /* достаем accessToken и прекрипляем его к headers */
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

/* 🟢baseQueryWithReauth - обертка над baseQuery, которая будет проверять - упал ли запрос по 401 ошибке */
export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  /* относится к mutex => просто скипаем */
  await mutex.waitForUnlock()

  /* делаем запрос */
  let result = await baseQuery(args, api, extraOptions)

  /* проверка - упал ли запрос по 401 ошибке*/
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        /* пробуем получить новый access token по refresh token */
        const refreshResult = (await baseQuery(
          {
            method: 'POST',
            url: '/v1/auth/update-tokens',
          },
          api,
          extraOptions
        )) as UpdateTokenResponseType

        if (refreshResult.data) {
          /* сохранаяем новый access token*/
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim())

          /* повторяем запрос, который упал из-за старого access token, только уже с новым access token*/
          result = await baseQuery(args, api, extraOptions)
        } else {
          /* не удалось обновить данные => очищаем стор*/
          inctagramApi.util.resetApiState()

          /* если не получилось получить новый access token, то перенаправляем пользователя на страничку регистрации*/
          if (!result?.meta?.request.url.includes('v1/auth/me')) {
            await Router.push(PATH.AUTH.SIGNIN)
          }
        }
      } finally {
        /* относится к mutex => просто скипаем */
        release()
      }
    } else {
      /* относится к mutex => просто скипаем */
      await mutex.waitForUnlock()
      // result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
