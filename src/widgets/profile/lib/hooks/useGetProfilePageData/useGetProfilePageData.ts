import { useLazyGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

export const useGetProfilePageData = (userId: string) => {
  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const isAuthorized = !!meRequestData

  const { data: profileData, isLoading: isProfileLoading } =
    useGetPublicUserProfileByIdQuery(userId)

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: !profileData || !isAuthorized }
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
    isProfileLoading,
    isUserDataLoading,
    postsData,
    profileData,
    userData,
  }
}
