import { RequestLineLoader } from '@/shared'

import { FollowerPost } from './followerPost/FollowerPost'
import { useHomePostsScroll } from './lib/useHomePostsScroll'

export const FollowersPosts = () => {
  const { homePosts, isLoadingGetHomePosts, ref } = useHomePostsScroll()

  return (
    <>
      {isLoadingGetHomePosts && <RequestLineLoader />}

      {homePosts.map(post => {
        return <FollowerPost key={post.id} post={post} />
      })}

      <div ref={ref} style={{ height: '30px', width: '100%' }} />
    </>
  )
}
