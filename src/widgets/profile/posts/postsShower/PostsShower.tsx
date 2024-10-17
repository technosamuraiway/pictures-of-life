import { memo } from 'react'

import { IPostImage } from '@/services'
import { SwiperSlider, useRouterLocaleDefinition } from '@/shared'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image, { StaticImageData } from 'next/image'

import s from './PostsShower.module.scss'

interface iPostsShower {
  posts: Array<IPostImage[]> | undefined
}

interface iSlideGroup {
  images: IPostImage[]
}

interface iSlideItem {
  alt: string
  src: StaticImageData | string
}

export const PostsShower = memo(({ posts }: iPostsShower) => {
  const t = useRouterLocaleDefinition()

  const postsWithSwiper = posts?.map((post, index) =>
    post.length > 0 ? (
      <div className={s.slideGroup} key={index}>
        <SlideGroup images={post} />
      </div>
    ) : (
      <div className={s.slideGroup} key={index}>
        <ImageNotFound height={230} width={230} />
        {/*<SlideItem alt={'no-image'} src={noImage} />*/}
      </div>
    )
  )

  const noPostsTitle = (
    <Typography variant={'h1'}>😥 {t.profile.postsShower.noPostsTitle} 😥</Typography>
  )

  return <div className={s.postsShower}>{posts ? postsWithSwiper : noPostsTitle}</div>
})

const SlideGroup = memo(({ images }: iSlideGroup) => {
  const firstImage = images[0]

  const postsGroupWithSwiper = (
    <SwiperSlider
      navigation
      paginationClickable
      slides={images.map(image => ({
        content: <SlideItem alt={image.uploadId} src={image.url} />,
      }))}
      spaceBetween={20}
    />
  )

  const onlyOnePost = <SlideItem alt={firstImage.uploadId} src={firstImage.url} />

  return <>{images.length > 1 ? postsGroupWithSwiper : onlyOnePost}</>
})

const SlideItem = memo(({ alt, src }: iSlideItem) => {
  return <Image alt={alt} height={230} src={src} width={230} />
})
