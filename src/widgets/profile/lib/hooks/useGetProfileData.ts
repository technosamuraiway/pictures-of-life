import { useAppSelector, useGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { meSelectorData } from '@/services/selectors/auth.selectors'

export function useGetProfilePageData(userId: string) {
  const meRequestData = useAppSelector(meSelectorData)

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

  const isOwnProfile = meRequestData?.userId === profileData?.id

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
