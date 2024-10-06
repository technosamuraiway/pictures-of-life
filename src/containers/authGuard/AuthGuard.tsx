import { PropsWithChildren, useState } from 'react'

import { useMeCurInfoQuery } from '@/services'
import { PATH, PRIVATE_ROUTES_SET } from '@/shared'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { InitLoader } from './initLoader'

export const AuthGuard: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const { data, isLoading } = useMeCurInfoQuery()

  const [value, setValue] = useState(router.pathname)

  // if (isLoading) {
  //   return <InitLoader />
  // }

  const pathWithoutQuery = router.pathname
  const isPrivateRout = PRIVATE_ROUTES_SET.has(pathWithoutQuery)

  // console.log(isPrivateRout)
  // console.log(validResponse)
  //
  // if (isPrivateRout) {
  //   router.push(PATH.HOME)
  // }

  // if (!data || isError) {
  //   router.push(PATH.AUTH.SIGNIN)
  //
  //   /* ⛔ если здесь ничего не возвращать, то будут возвращаться children
  //    * => даже переходя на приватную страницу без авторизации - будет кратковременно
  //    * отрисовываться данная приватная страница
  //    * */
  //   return null
  // }

  // если: ПРИШЕЛ ОТВЕТ С СЕРВРЕА + ПОЛЬЗОВАТЕЛЬ КАК-ТО ХОЧЕТ ПОПАСТЬ НА auth страничку => отправить на home
  if (data && isPrivateRout) {
    router.push(PATH.HOME)
  }

  return <>{children}</>
}
