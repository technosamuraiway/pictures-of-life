import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation, useLazyMeCurInfoQuery } from '@/services'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

export const useGoogleAuth = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { accessToken, code } = router.query
  const [googleSignUp, { isLoading: isGoogleSignLoading }] = useGoogleSignUpMutation()
  const [me] = useLazyMeCurInfoQuery()

  useEffect(() => {
    if (code) {
      googleSignUp({ code })
        .unwrap()
        .then(async () => {
          // чтобы пройти AuthGuard
          await me()
          toast.success(t.signInPage.successLogIn)
          router.replace(PATH.HOME)
        })
    }
    if (accessToken) {
      localStorage.setItem('accessToken', String(accessToken))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return { isGoogleSignLoading }
}
