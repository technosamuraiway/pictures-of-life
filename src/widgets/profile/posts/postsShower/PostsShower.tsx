import { memo } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { PostWithId } from '@/widgets'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './PostsShower.module.scss'

interface iPostsShower {
  posts: PostWithId[]
}

export const PostsShower = memo(({ posts }: iPostsShower) => {
  const t = useRouterLocaleDefinition()

  const postsWithSwiper = posts?.map(post => (
    <PostsItem
      images={post.images}
      imgHeight={234}
      imgWidth={234}
      key={post.id}
      postId={post.id}
      rootCN={s.postsItem}
    />
  ))

  const noPostsTitle = (
    <Typography variant={'h1'}>😥 {t.profile.postsShower.noPostsTitle} 😥</Typography>
  )

  return <div className={s.root}>{posts ? postsWithSwiper : noPostsTitle}</div>
})
