import { useMemo } from 'react'

import { useLazyGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { uniqBy } from 'lodash'

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
      data: rawPostsData,
      isLoading: isPostsLoading,
      originalArgs: originalArgsGetPostsTrigger,
      status: postsFetchingStatus,
    },
  ] = useLazyGetUserPublicPostsQuery()

  const postsData = useMemo(() => {
    if (!rawPostsData) {
      return undefined
    }

    return {
      ...rawPostsData,
      items: uniqBy(rawPostsData.items, 'id'),
    }
  }, [rawPostsData])

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
