import { useMemo } from 'react'

import { PostsAssociativeArray } from '@/widgets'
import { useRouter } from 'next/router'

import { useGetProfilePageData } from './useGetProfilePageData/useGetProfilePageData'
import { usePostsScrollObserver } from './usePostsScrollObserver/usePostsScrollObserver'

export function useProfilePage() {
  const { query } = useRouter()

  const userId = query.userId as string

  const {
    getPostsTrigger,
    isAuthorized,
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    postsData,
    profileData,
    userData,
  } = useGetProfilePageData(userId)

  const { ref } = usePostsScrollObserver(
    userId,
    postsData,
    getPostsTrigger,
    isPostsLoading,
    isAuthorized
  )

  // кешированный массив постов
  const postsArray = useMemo(
    () => postsData?.items.map(item => ({ id: item.id, images: item.images })) || [],
    [postsData]
  )

  // кешированный ассоциативный массив
  const postsAssociativeArray = useMemo(() => {
    return (
      postsData?.items.reduce((acc, post) => {
        acc[post.id] = post.images

        return acc
      }, {} as PostsAssociativeArray) || {}
    )
  }, [postsData])

  return {
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    postsArray,
    postsAssociativeArray,
    profileData,
    ref,
    userData,
  }
}
