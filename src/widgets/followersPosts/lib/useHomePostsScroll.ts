import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { HomePost, useGetPostForHomeQuery } from '@/services'

export const useHomePostsScroll = () => {
  const { inView, ref } = useInView()
  const [endCursorId, setEndCursorId] = useState<number | undefined>(0)
  const [homePosts, setHomePosts] = useState<HomePost[]>([])

  const { data: getHomePostsData, isLoading: isLoadingGetHomePosts } = useGetPostForHomeQuery({
    endCursorPostId: endCursorId,
  })

  const updateHomePosts = useCallback((newPosts: HomePost[]) => {
    setHomePosts(prev => {
      const uniqueNewPosts = newPosts.filter(
        newPost => !prev.some(existingPost => existingPost.id === newPost.id)
      )

      return [...prev, ...uniqueNewPosts]
    })
  }, [])

  useEffect(() => {
    if (getHomePostsData?.items) {
      updateHomePosts(getHomePostsData.items)
    }
  }, [getHomePostsData, updateHomePosts])

  useEffect(() => {
    if (
      getHomePostsData &&
      inView &&
      homePosts.length > 0 &&
      homePosts.length < getHomePostsData?.totalCount
    ) {
      const lastImageId = homePosts[homePosts.length - 1].id

      if (endCursorId !== lastImageId) {
        setEndCursorId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endCursorId, inView])

  return { homePosts, isLoadingGetHomePosts, ref }
}
