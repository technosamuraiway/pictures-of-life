import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { IPostUser } from '@/services/types/post.types'

export const useUserPostsScroll = (userId: number) => {
  const { inView, ref } = useInView()
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined) // Курсор
  const [userPosts, setUserPosts] = useState<IPostUser[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { data: getUserPostsData, isLoading: isLoadingUserPosts } = useGetUserPublicPostsQuery({
    endCursorPostId,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    userId,
  })

  useEffect(() => {
    if (getUserPostsData?.items) {
      setUserPosts(prevPosts => {
        const newPosts = getUserPostsData.items.filter(
          newPost => !prevPosts.some(existingPost => existingPost.id === newPost.id)
        )

        return [...prevPosts, ...newPosts]
      })

      if (getUserPostsData.totalCount) {
        setTotalCount(getUserPostsData.totalCount)
      }
    }
  }, [getUserPostsData])

  useEffect(() => {
    if (
      getUserPostsData &&
      inView &&
      userPosts.length < totalCount &&
      getUserPostsData.items.length > 0
    ) {
      const lastPostId = getUserPostsData.items.at(-1)?.id

      if (lastPostId && lastPostId !== endCursorPostId) {
        setEndCursorPostId(lastPostId)
      }
    }
  }, [inView, getUserPostsData, userPosts, totalCount, endCursorPostId])

  return { isLoadingUserPosts, ref, totalCount, userPosts }
}
