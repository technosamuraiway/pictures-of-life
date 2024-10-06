import { PropsWithChildren } from 'react'

import { useMeCurInfoQuery } from '@/services'
import { PATH, PUBLIC_ROUTES_SET } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { InitLoader } from './initLoader'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const { data, isLoading } = useMeCurInfoQuery()

  if (isLoading) {
    return <InitLoader />
  }

  const pathWithoutQuery = router.pathname
  const isGitHubAuth = router.pathname === PATH.AUTH.URLGITHUBLOGIN
  const shouldRedirect = !!data === PUBLIC_ROUTES_SET.has(pathWithoutQuery)

  // не мешаем запросу-авторизации через GitHub
  if (shouldRedirect && !isGitHubAuth) {
    router.push(data ? PATH.HOME : PATH.AUTH.SIGNIN)

    /* ⛔ если здесь ничего не возвращать, то будут возвращаться children
     * => даже переходя на приватную страницу без авторизации - будет кратковременно
     * отрисовываться данная приватная страница
     * */
    return null
  }

  return <>{children}</>
}
