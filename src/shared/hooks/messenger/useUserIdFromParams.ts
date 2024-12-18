import { useRouter } from 'next/router'

export const useUserIdFromParams = () => {
  const { query } = useRouter()
  const { userId } = query

  return { userId }
}
