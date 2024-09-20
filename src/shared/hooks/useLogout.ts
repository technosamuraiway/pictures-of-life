import { toast } from 'react-toastify'

import { useLogOutMutation } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import { PATH } from '../utils'

export function useLogout() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const [
    logOut,
    { isError: isErrorLogout, isLoading: isLoadingLogout, isSuccess: isSuccessLogout },
  ] = useLogOutMutation()

  const handleLogout = async () => {
    await logOut().unwrap()
    toast.info(t.logOut.logOutSuccess)

    router.replace(PATH.AUTH.SIGNIN)
  }

  return { handleLogout, isErrorLogout, isLoadingLogout, isSuccessLogout }
}
