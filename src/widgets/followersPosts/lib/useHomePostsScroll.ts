import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { HomePost, useGetPostForHomeQuery } from '@/services'

export const useHomePostsScroll = () => {
  const { inView, ref } = useInView()
  const [endCursorId, setEndCursorId] = useState<number | undefined>(0)
  const [homePosts, setHomePosts] = useState<HomePost[] | undefined>(undefined)

  const { data: getHomePostsData } = useGetPostForHomeQuery({
    endCursorPostId: endCursorId,
  })

  useEffect(() => {
    if (getHomePostsData?.items) {
      setHomePosts(prevPosts => {
        const updatedPosts =
          prevPosts?.map(existingPost => {
            const updatedPost = getHomePostsData.items.find(
              newPost => newPost.id === existingPost.id
            )

            return updatedPost || existingPost
          }) || []

        const newPosts = getHomePostsData.items.filter(
          newPost => !prevPosts?.some(existingPost => existingPost.id === newPost.id)
        )

        return [...updatedPosts, ...newPosts]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHomePostsData, endCursorId])

  useEffect(() => {
    if (
      homePosts &&
      getHomePostsData &&
      inView &&
      homePosts.length > 0 &&
      homePosts.length < getHomePostsData?.totalCount
    ) {
      const lastImageId = getHomePostsData.nextCursor

      if (endCursorId !== lastImageId) {
        setEndCursorId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endCursorId, inView])

  return { homePosts, ref }
}
