import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation, useLazyMeCurInfoQuery } from '@/services'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

export const useGoogleGitAuth = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { code } = router.query
  const { accessToken } = router.query
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
    if (accessToken && typeof accessToken === 'string') {
      localStorage.setItem('accessToken', accessToken)
    
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, accessToken])

  return { isGoogleSignLoading }
}
