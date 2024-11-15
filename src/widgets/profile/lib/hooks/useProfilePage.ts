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
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
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
  const postsArray = useMemo(() => {
    const posts = postsData?.items.map(item => ({ id: item.id, images: item.images })) || []

    /* при удалении нужно будет валидировать посты, но мы запрашиваем их по событию,
     * поэтому нужно будет делать повторный запрос, а для этого нужно знать сколько постов подтягивать
     * => invalidateTags не работает в этом случае
     * */
    sessionStorage.setItem('postsNumber', JSON.stringify(posts.length))

    return posts
  }, [postsData])

  // кешированный ассоциативный массив
  const postsImagesAssociativeArray = useMemo(() => {
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
    isPostsLoadingInitial,
    isPostsLoadingWithScroll,
    isProfileLoading,
    isUserDataLoading,
    postsArray,
    postsImagesAssociativeArray,
    profileData,
    ref,
    userData,
  }
}
