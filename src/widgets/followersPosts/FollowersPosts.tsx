import { AddNewFriends, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'

import { FollowerPost } from './followerPost/FollowerPost'
import { useHomePostsScroll } from './lib/useHomePostsScroll'

export const FollowersPosts = () => {
  const t = useRouterLocaleDefinition()
  const { homePosts, isLoadingGetHomePosts, ref } = useHomePostsScroll()

  return (
    <>
      {isLoadingGetHomePosts && <RequestLineLoader />}

      {homePosts.length > 0 ? (
        homePosts.map(post => {
          return <FollowerPost key={post.id} post={post} />
        })
      ) : (
        <AddNewFriends title={t.home.noPosts} />
      )}

      <div ref={ref} style={{ height: '30px', width: '100%' }} />
    </>
  )
}
