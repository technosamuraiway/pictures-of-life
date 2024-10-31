import { PATH } from '@/shared'
import { useRouter } from 'next/router'

export function useCloseProfilePostModalWithRouter() {
  const { ...router } = useRouter()

  function close() {
    router.push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${router.query.userId}` })
  }

  return { close, ...router }
}
