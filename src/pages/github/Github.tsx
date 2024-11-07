import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useLazyMeCurInfoQuery } from '@/services'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useRouter } from 'next/router'

function GithubPage() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const { accessToken } = router.query
  const [me] = useLazyMeCurInfoQuery()

  useEffect(() => {
    if (accessToken) {
      const awaitGithub = async () => {
        localStorage.setItem('accessToken', accessToken as string)
        await me()
        toast.success(t.signInPage.successLogIn)

        router.replace(PATH.HOME)
      }

      awaitGithub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return <h2>GITHUB 2</h2>
}

GithubPage.getLayout = getBaseLayout
export default GithubPage
