import React, { PropsWithChildren } from 'react'

import { useMeCurInfoQuery } from '@/services'
import { InitLoader, PATH, PUBLIC_ROUTES_SET } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  // const { pathname, push } = useRouter()
  //
  // const { data, isLoading } = useMeCurInfoQuery()
  //
  // console.log(pathname)
  //
  // if (isLoading) {
  //   return <InitLoader />
  // }
  //
  // if (!!data === PUBLIC_ROUTES_SET.has(pathname)) {
  //   push(data ? PATH.HOME : PATH.AUTH.SIGNIN)
  //
  //   /* Если ничего не возвращать в этом блоке => то будут возвращаться children
  //    *  даже переход на публичную страницу без авторизации - будет кратковременно отрисовыываться приватная страница */
  //
  //   return null
  // }

  return <>{children}</>
}
