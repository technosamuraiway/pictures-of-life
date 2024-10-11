import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

import { useMeCurInfoQuery } from '@/services'
import { inctagramApi } from '@/services/api/inctagram.api'
import { InitLoader, PATH, PUBLIC_ROUTES_SET } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()
  const { pathname, push } = useRouter()

  const { data, isLoading } = useMeCurInfoQuery()

  if (isLoading) {
    return <InitLoader />
  }

  if (!!data === PUBLIC_ROUTES_SET.has(pathname)) {
    push(data ? PATH.HOME : PATH.AUTH.SIGNIN)

    dispatch(inctagramApi.util.resetApiState())

    /* Если ничего не возвращать в этом блоке => то будут возвращаться children
     *  даже переход на публичную страницу без авторизации - будет кратковременно отрисовыываться приватная страница */
    return null
  }

  return <>{children}</>
}
