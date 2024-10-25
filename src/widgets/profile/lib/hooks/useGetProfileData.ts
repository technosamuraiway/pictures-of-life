import { useGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

export function useGetProfilePageData(userId: string) {
  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const { data: profileData, isLoading: isProfileLoading } = useGetPublicUserProfileByIdQuery(
    userId,
    {
      skip: !meRequestData,
    }
  )

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: !profileData }
  )

  const { data: postsData, isLoading: isPostsLoading } = useGetUserPublicPostsQuery(
    { userId: Number(userId) },
    { skip: !meRequestData }
  )

  return {
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    postsData,
    profileData,
    userData,
  }
}
