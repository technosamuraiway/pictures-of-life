import { toast } from 'react-toastify'

import { useLogOutMutation } from '@/services'
import { useRouter } from 'next/router'

import { PATH } from '../utils'

export function useLogout() {
  const router = useRouter()
  const [
    logOut,
    { isError: isErrorLogout, isLoading: isLoadingLogout, isSuccess: isSuccessLogout },
  ] = useLogOutMutation()

  const handleLogout = async () => {
    try {
      await logOut().unwrap()
      router.replace(PATH.AUTH.SIGNIN)
    } catch (err) {
      toast.error(`Something wrong... ${err}`)
    }
  }

  return { handleLogout, isErrorLogout, isLoadingLogout, isSuccessLogout }
}
