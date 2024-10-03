import { PropsWithChildren } from 'react'

import { InitLoader } from '@/containers/authGuard/initLoader/InitLoader'
import { useMeCurInfoQuery } from '@/services'
import { PATH } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { data, isLoading } = useMeCurInfoQuery()

  if (isLoading) {
    return <InitLoader />
  }

  if (!data) {
    return router.push(PATH.AUTH.SIGNIN)
  }

  return <>{children}</>
}
