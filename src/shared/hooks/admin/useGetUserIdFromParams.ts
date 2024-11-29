import { useRouter } from 'next/router'

export const useGetUserIdFromParams = () => {
  const { query } = useRouter()
  const userId = query.userId

  return { userId }
}
