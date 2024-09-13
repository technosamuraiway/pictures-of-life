import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { PATH, getBaseLayout, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

function GithubPage() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)
      toast.success(t.loginSuccess)
      router.replace(PATH.HOME)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])
}

GithubPage.getLayout = getBaseLayout
export default GithubPage
