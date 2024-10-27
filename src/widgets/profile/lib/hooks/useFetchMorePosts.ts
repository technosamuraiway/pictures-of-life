import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function useFetchMorePosts(loadMorePosts: () => void, isPostsLoading: boolean) {
  const { inView, ref } = useInView()

  useEffect(() => {
    if (inView && !isPostsLoading) {
      loadMorePosts()
    }
  }, [inView, isPostsLoading, loadMorePosts])

  return { ref }
}
