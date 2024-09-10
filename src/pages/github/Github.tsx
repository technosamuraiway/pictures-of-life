import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function GithubPage() {
  const router = useRouter()

  const { accessToken, email } = router.query

  useEffect(() => {
    if (accessToken && email) {
      localStorage.setItem('accessToken', accessToken as string)
      toast.success('You are logged in!')
      router.push(`/`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])
}
