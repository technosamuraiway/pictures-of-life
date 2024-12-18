import { AddNewFriends, InitLoader, useRouterLocaleDefinition } from '@/shared'

import { FollowerPost } from './followerPost/FollowerPost'
import { useHomePostsScroll } from './lib/useHomePostsScroll'

export const FollowersPosts = () => {
  const t = useRouterLocaleDefinition()
  const { endCursorId, homePosts, isLoadingGetHomePosts, ref } = useHomePostsScroll()

  if (isLoadingGetHomePosts || (homePosts.length === 0 && endCursorId === 0)) {
    return <InitLoader />
  }

  return (
    <>
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
