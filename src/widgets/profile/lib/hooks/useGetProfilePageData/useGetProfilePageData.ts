import { useLazyGetUserPublicPostsQuery } from '@/services'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

export const useGetProfilePageData = () => {
  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const isAuthorized = !!meRequestData

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    meRequestData?.userName ?? '',
    { skip: !isAuthorized }
  )

  const [
    getPostsTrigger,
    {
      data: postsGetData,
      isLoading: isPostsLoading,
      originalArgs: originalArgsGetPostsTrigger,
      status: postsFetchingStatus,
    },
  ] = useLazyGetUserPublicPostsQuery()

  const isPostsLoadingInitial =
    postsFetchingStatus === 'pending' && !originalArgsGetPostsTrigger?.endCursorPostId

  const isPostsLoadingWithScroll =
    postsFetchingStatus === 'pending' &&
    !isPostsLoading &&
    !!originalArgsGetPostsTrigger?.endCursorPostId

  const postsData = postsGetData

  return {
    getPostsTrigger,
    isAuthorized,
    isOwnProfile,
    isPostsLoading,
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
    isUserDataLoading,
    postsData,
    userData,
  }
}
