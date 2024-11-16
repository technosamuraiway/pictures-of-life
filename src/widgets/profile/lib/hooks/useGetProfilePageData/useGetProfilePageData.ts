import { useLazyGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

export const useGetProfilePageData = (userId: string) => {
  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const { data: profileData, isLoading: isProfileLoading } =
    useGetPublicUserProfileByIdQuery(userId)

  const isAuthorized = !!meRequestData

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: !profileData || !isAuthorized }
  )

  const [
    getPostsTrigger,
    {
      data: postsData,
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
