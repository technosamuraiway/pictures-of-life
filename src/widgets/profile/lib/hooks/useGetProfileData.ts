import { useAppSelector, useGetProfileQuery, useGetUserPublicPostsQuery } from '@/services'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { meSelectorData } from '@/services/selectors/auth.selectors'

export function useGetProfilePageData(userId: string) {
  const meRequestData = useAppSelector(meSelectorData)

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !meRequestData,
  })

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: !profileData }
  )

  const { data: postsData, isLoading: isPostsLoading } = useGetUserPublicPostsQuery(
    { userId: Number(userId) },
    { skip: !profileData }
  )

  return { isPostsLoading, isProfileLoading, isUserDataLoading, postsData, profileData, userData }
}
