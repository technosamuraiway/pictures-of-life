import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { GET_POSTS_LIST } from '@/services/graphql/queries/posts'
import { IAdminPost } from '@/shared'
import { useQuery } from '@apollo/client'

export const useGetPosts = () => {
  const [endCursorPostId, setEndCursorPostId] = useState<null | number>(0)
  const [postsData, setPostsData] = useState<IAdminPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { inView, ref } = useInView()

  const {
    data: getPostsListData,
    loading: getPostsListDataISLoading,
    refetch,
  } = useQuery(GET_POSTS_LIST, {
    variables: {
      endCursorPostId,
      searchTerm,
    },
  })

  useEffect(() => {
    if (getPostsListData && getPostsListData.getPosts) {
      setPostsData(prevData => [...prevData, ...getPostsListData.getPosts.items])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPostsListData, endCursorPostId])

  useEffect(() => {
    if (getPostsListData && inView && postsData.length > 0) {
      const lastImageId = postsData[postsData.length - 1].id

      if (endCursorPostId !== lastImageId) {
        setEndCursorPostId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endCursorPostId, inView])

  return { getPostsListDataISLoading, postsData, ref, refetch, searchTerm, setSearchTerm }
}
