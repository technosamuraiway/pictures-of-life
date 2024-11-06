import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { PATH, useGoogleGitAuth, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useRouter } from 'next/router'

function GithubPage() {
  useGoogleGitAuth()
  console.log("in GITHUB page")
//   const t = useRouterLocaleDefinition()
//   const router = useRouter()

//   const { accessToken, email } = router.query

//   useEffect(() => {
//     if (accessToken && email) {
//       localStorage.setItem('accessToken', accessToken as string)
//       toast.success(t.signInPage.successLogIn)

//       router.replace(PATH.HOME)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [accessToken])
return <h1>GITHUB</h1>
}

// GithubPage.getLayout = getBaseLayout
export default GithubPage
