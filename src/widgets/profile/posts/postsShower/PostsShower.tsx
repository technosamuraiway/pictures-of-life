import { memo } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { PostWithId } from '@/widgets'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './PostsShower.module.scss'

import { SlideGroup } from './slideGroup/SlideGroup'

interface iPostsShower {
  posts: PostWithId[] | undefined
}

export const PostsShower = memo(({ posts }: iPostsShower) => {
  const t = useRouterLocaleDefinition()

  const postsWithSwiper = posts?.map(post =>
    post.images.length > 0 ? (
      <div className={s.slideGroup} key={post.id}>
        <SlideGroup id={post.id} images={post.images} />
      </div>
    ) : (
      <div className={s.slideGroup} key={post.id}>
        <ImageNotFound height={230} width={230} />
        {/*<SlideItem alt={'no-image'} src={noImage} />*/}
      </div>
    )
  )

  const noPostsTitle = (
    <Typography variant={'h1'}>😥 {t.profile.postsShower.noPostsTitle} 😥</Typography>
  )

  return <div className={s.root}>{posts ? postsWithSwiper : noPostsTitle}</div>
})
