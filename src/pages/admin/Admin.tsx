import { useEffect } from 'react'

import { MetaHead, PATH } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { useRouter } from 'next/router'

function Admin() {
  const { pathname, replace } = useRouter()

  useEffect(() => {
    if (pathname === '/admin' && localStorage.getItem('verificationAdmin')) {
      replace(PATH.ADMIN)
    } else {
      replace(PATH.AUTH.SIGNINADMIN)
    }
  }, [])

  return <MetaHead title={'Pictures-Of-Life'} />
}

Admin.getLayout = getLayoutWithNav
export default Admin
