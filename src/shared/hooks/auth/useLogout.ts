import { toast } from 'react-toastify'

import { inctagramApi, useLogOutMutation } from '@/services'
import { useAppDispatch } from '@/services/store'
import { useRouter } from 'next/router'

import { PATH } from '../../utils'
import { useRouterLocaleDefinition } from '../useRouterLocaleDefinition'

type serverError = {
  status: number
}

export function useLogout() {
  const t = useRouterLocaleDefinition()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [
    logOut,
    { isError: isErrorLogout, isLoading: isLoadingLogout, isSuccess: isSuccessLogout },
  ] = useLogOutMutation()

  const logoutPurification = () => {
    localStorage.removeItem('accessToken')
    router.replace(PATH.AUTH.SIGNIN)
    dispatch(inctagramApi.util.resetApiState())
    toast.info(t.logOut.logOutSuccess)
  }

  const handleLogout = async () => {
    /* 📛 очистка всего кеша STORE 📛
     * зачем нужно? => после logout, у нас остается me-запрос в кеше,
     * и когда мы через routes переходим ДАЖЕ на приватную страницу
     * me-запрос не происходит, так как он в кеше...
     * => даже после logout мы можем посещать приватные страницы
     *
     * почему бы не воспользоваться ВАЛИДАЦИЕЙ тегов в RTK-query-api ['me']?
     * => потому что Logout запрос ничего не возвращает => валидацию на него не повесить */

    /* Очень важно удалить токен именно не дожидаясь ответа.

         Сценарий: если удалить refreshToken и нажать logout - accessToken останется
         и все запросы буду проходить...

         Почему так? видимо для успешного запроса - logout нужен refreshToken в cookie, а его нет */

    try {
      await logOut().unwrap()
      logoutPurification()
    } catch (error: unknown) {
      const serverError = error as serverError

      /* вариант, когда запрос пошёл без refreshToken */
      if (serverError?.status === 401) {
        logoutPurification()
      }
    }
  }

  return { handleLogout, isErrorLogout, isLoadingLogout, isSuccessLogout }
}
