import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation, useMeCurInfoQuery } from '@/services'
import {
  MetaHead,
  PATH,
  restoreStateFromLocalStorage,
  saveStateToLocalStorage,
  useLogout,
  useRouterLocaleDefinition,
} from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Home.module.scss'
import { Button } from '@technosamurai/techno-ui-kit'

function Home() {
  const { handleLogout } = useLogout()
  const t = useRouterLocaleDefinition()
  const [googleSignUp, { isLoading: isGoogleSignLoading }] = useGoogleSignUpMutation()
  const router = useRouter()
  const { code } = router.query
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    if (code) {
      googleSignUp({
        code: code,
      })
        .unwrap()
        .then(({ accessToken, email }) => {
          saveStateToLocalStorage('accessToken', accessToken)
          toast.success(t.loginSuccess)
          setIsLoggedIn(true)
          if (!isGoogleSignLoading && restoreStateFromLocalStorage('accessToken', '')) {
            router.replace(PATH.HOME)
          }
        })
        .catch(err => {
          toast.error(t.loginError)
          router.replace(PATH.AUTH.SIGNIN)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    const token = restoreStateFromLocalStorage('accessToken', '')
    setIsLoggedIn(!!token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Link - временные ссылки, чтобы показать работу NextTopLoader */}
      <div className={s.links}>
        <Link href={PATH.HOME}>Home</Link>
        <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
        <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
        <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
        <Link href={'/avatar/avatartest'}>Avatar Page</Link>
        <Link href={'/settings'}>Settings</Link>
      </div>
      <MetaHead title={'Pictures-Of-Life'} />
      <div className={s.body}>
        <h1>{t.title}</h1>
        {isLoggedIn ? (
          <p style={{ marginTop: 20 }}>{t.loginSuccess}</p>
        ) : (
          <p style={{ marginTop: 20 }}>{t.loginError}</p>
        )}
      </div>
      {isLoggedIn && <Button onClick={() => handleLogout()}>Log out</Button>}
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
