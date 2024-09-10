import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useRouterLocaleDefinition } from '@/shared'

export default function GithubPage() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)
      toast.success(t.loginSuccess)
      router.push(`/`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])
}
