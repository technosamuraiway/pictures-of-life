import { useRouter } from 'next/router'

export const useGetUserIdFromParams = () => {
  const { push, query } = useRouter()
  const userId = query.userId

  return { push, userId }
}
