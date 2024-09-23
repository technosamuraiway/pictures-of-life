import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation, useLazyMeCurInfoQuery, useMeCurInfoQuery } from '@/services'
import { MetaHead, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Home.module.scss'

function Home() {
  const { data: meData } = useMeCurInfoQuery()
  // const t = useRouterLocaleDefinition()
  //
  // const [meLazy, { data: meLazyData, isLoading: meLazyIsLoading }] = useLazyMeCurInfoQuery()
  // const [googleSignUp, { isLoading: isGoogleSignLoading }] = useGoogleSignUpMutation()
  // const router = useRouter()
  // const { code } = router.query
  //
  // const handleGoogleSignUp = useCallback(async () => {
  //   if (code) {
  //     try {
  //       await googleSignUp({ code }).unwrap()
  //       toast.success(t.loginSuccess)
  //
  //       // Получаем информацию о пользователе перед перенаправлением
  //       const result = await meLazy().unwrap()
  //
  //       if (result) {
  //         // Перенаправляем только если получили данные пользователя
  //         router.replace(PATH.HOME)
  //       }
  //     } catch (e: any) {
  //       toast.error(e)
  //       router.replace(PATH.AUTH.SIGNIN)
  //     }
  //   }
  // }, [code, googleSignUp, meLazy, router, t.loginSuccess])
  //
  // useEffect(() => {
  //   handleGoogleSignUp()
  // }, [handleGoogleSignUp])

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <div className={s.links}>
        <Link href={PATH.HOME}>Home</Link>
        <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
        <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
        <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
        <Link href={PATH.PROFILE.SETTINGS}>Settings</Link>
      </div>
      {meData && <Typography>{`${meData.userName}-is log in`}</Typography>}
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
