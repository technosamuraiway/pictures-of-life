import { useAppSelector } from '@/services'
import { meSelectorData } from '@/services/selectors/auth.selectors'
import { useRouter } from 'next/router'

export function useMeWithRouter() {
  const meData = useAppSelector(meSelectorData)
  const router = useRouter()

  const isOwnProfile = meData?.userId == router.query.userId

  return { isOwnProfile, meData, router }
}
