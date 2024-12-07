import { PropsWithChildren } from 'react'

import { useMeCurInfoQuery } from '@/services'
import { InitLoader, PATH, PUBLIC_ROUTES_SET } from '@/shared'
import { useRouter } from 'next/router'

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { pathname, query, replace } = useRouter()
  const { data, isLoading } = useMeCurInfoQuery()

  // Проверили код от google в url
  const isGoogleAuthCallback = !!query.code

  // почему не isLoading? - потому что он пропускает код дальше при самом первом рендере
  if (isLoading) {
    return <InitLoader />
  }

  //если страничка и публичная, и приватная - одновременно
  if (pathname === PATH.PROFILE.BASEPROFILEWITHQUERY || isGoogleAuthCallback) {
    return <>{children}</>
  }

  if (!!data === PUBLIC_ROUTES_SET.has(pathname)) {
    replace(data ? PATH.HOME : PATH.PUBLIC)

    /* Если ничего не возвращать в этом блоке => то будут возвращаться children
     * даже переход на публичную страницу без авторизации - будет кратковременно отрисовываться приватная страница */
    return null
  }

  return <>{children}</>
}
