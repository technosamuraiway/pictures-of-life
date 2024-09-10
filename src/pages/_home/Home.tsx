import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation } from '@/services'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import s from './Home.module.scss'

export default function Home() {
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
          if (accessToken && email) {
            localStorage.setItem('accessToken', accessToken)
          }
          toast.success(t.loginSuccess)
          
        })
        .then(() =>{
          if(!isGoogleSignLoading && localStorage.getItem('accessToken')) router.push('/')
        })
        .catch(err => {
          toast.error('Something wrong, try again')
          router.push('auth/signin')
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
      {isGoogleSignLoading && <RequestLineLoader />}
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
