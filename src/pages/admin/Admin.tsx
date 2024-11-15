import { useEffect } from 'react'

import { MetaHead, PATH } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { useRouter } from 'next/router'

function Admin() {
  const { pathname, replace } = useRouter()

  useEffect(() => {
    if (pathname === '/admin' && sessionStorage.getItem('verificationAdmin')) {
      replace(PATH.ADMIN)
    } else {
      replace(PATH.AUTH.SIGNINADMIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <MetaHead title={'Pictures-Of-Life'} />
}

Admin.getLayout = getLayoutWithNav
export default Admin
