import { useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

import { useProfilePageStore } from '../store/zustandStore'

export function useGetProfilePageData(userId: string) {
  const { lastPostId: endCursorPostId, setLastPostId: setEndCursorPostId } = useProfilePageStore()
  const { inView, ref } = useInView()

  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const { data: profileData, isLoading: isProfileLoading } =
    useGetPublicUserProfileByIdQuery(userId)

  const isAuthorizedWithProfileData = !profileData || !meRequestData

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: isAuthorizedWithProfileData }
  )

  const { data: postsData, isLoading: isPostsLoading } = useGetUserPublicPostsQuery(
    {
      endCursorPostId,
      pageSize: endCursorPostId ? 8 : 12,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: Number(userId),
    },
    // гарантирует, что запрос будет выполнен заново при изменении endCursorPostId
    { refetchOnMountOrArgChange: true }
  )

  const loadMorePosts = useCallback(() => {
    if (postsData && postsData.items.length > 0) {
      const lastPostId = postsData.items[postsData.items.length - 1].id

      setEndCursorPostId(lastPostId)
    }
  }, [postsData])

  useEffect(() => {
    if (inView && !isPostsLoading) {
      loadMorePosts()
    }
  }, [inView, isPostsLoading, loadMorePosts])

  return {
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    loadMorePosts,
    postsData,
    profileData,
    ref,
    userData,
  }
}
