import { AddNewFriends, InitLoader, useRouterLocaleDefinition } from '@/shared'

import { FollowerPost } from './followerPost/FollowerPost'
import { useHomePostsScroll } from './lib/useHomePostsScroll'

export const FollowersPosts = () => {
  const t = useRouterLocaleDefinition()
  const { homePosts, ref } = useHomePostsScroll()

  if (homePosts === undefined) {
    return <InitLoader />
  }

  return (
    <>
      {homePosts && homePosts?.length > 0 ? (
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
