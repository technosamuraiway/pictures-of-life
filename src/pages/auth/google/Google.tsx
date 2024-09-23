import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGoogleSignUpMutation } from '@/services'
import { PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useRouter } from 'next/router'

const Google = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { code } = router.query
  const [googleSignUp, { isLoading: isGoogleSignLoading }] = useGoogleSignUpMutation()

  useEffect(() => {
    if (code) {
      googleSignUp({ code })
        .unwrap()
        .then(() => {
          toast.success(t.loginSuccess)

          router.replace(PATH.HOME)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return isGoogleSignLoading && <RequestLineLoader />
}

Google.getLayout = getBaseLayout
export default Google
