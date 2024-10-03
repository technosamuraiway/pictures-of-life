import { PropsWithChildren } from 'react'

import { InitLoader } from '@/containers/authGuard/initLoader/InitLoader'
import { useMeCurInfoQuery } from '@/services'
import { PATH } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { data, isError, isLoading } = useMeCurInfoQuery()

  if (isLoading) {
    return <InitLoader />
  }

  if (!data || isError) {
    router.push(PATH.AUTH.SIGNIN)

    /* ⛔ если здесь ничего не возвращать, то будут возвращаться children
     * => даже переходя на приватную страницу без авторизации - будет кратковременно
     * отрисовываться данная приватная страница
     * */
    return null
  }

  return <>{children}</>
}
