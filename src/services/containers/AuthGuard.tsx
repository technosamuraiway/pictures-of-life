import type { PropsWithChildren } from 'react'

import { InitLoader, PATH, PUBLIC_ROUTES_SET } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useMeCurInfoQuery } from '../flow/auth.service'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const { data, isLoading } = useMeCurInfoQuery()

  if (isLoading) {
    return <InitLoader />
  }

  // не мешаем запросу-авторизации через GitHub
  if (!!data === PUBLIC_ROUTES_SET.has(router.pathname)) {
    router.push(data ? PATH.HOME : PATH.AUTH.SIGNIN)

    /* ⛔ если здесь ничего не возвращать, то будут возвращаться children
     * => даже переходя на приватную страницу без авторизации - будет кратковременно
     * отрисовываться данная приватная страница
     * */
    return null
  }

  return <>{children}</>
}
