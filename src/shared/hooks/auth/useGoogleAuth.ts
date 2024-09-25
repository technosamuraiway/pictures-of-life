import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation } from '@/services'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

export const useGoogleAuth = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { code } = router.query
  const [googleSignUp, { isLoading: isGoogleSignLoading }] = useGoogleSignUpMutation()

  useEffect(() => {
    if (code) {
      googleSignUp({ code })
        .unwrap()
        .then(() => {
          toast.success(t.signInPage.successLogIn)
          router.replace(PATH.HOME)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return { isGoogleSignLoading }
}
