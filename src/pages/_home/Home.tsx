import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation } from '@/services'
import { MetaHead, PATH, getBaseLayout, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/shared/components/layouts/LayoutWithNav'
import { useRouter } from 'next/router'

import s from './Home.module.scss'

function Home() {
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
          localStorage.setItem('accessToken', accessToken)
          toast.success(t.loginSuccess)
          setIsLoggedIn(true)
          if (!isGoogleSignLoading && localStorage.getItem('accessToken')) {
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
    const token = localStorage.getItem('accessToken')

    setIsLoggedIn(!!token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <div className={s.body}>
        <h1>{t.title}</h1>
        {isLoggedIn ? (
          <p style={{ marginTop: 20 }}>{t.loginSuccess}</p>
        ) : (
          <p style={{ marginTop: 20 }}>{t.loginError}</p>
        )}
      </div>
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
