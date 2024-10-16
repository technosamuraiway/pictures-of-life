import { memo, useMemo } from 'react'

import { IPostImage } from '@/services'
import { SwiperSlider, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './PostsShower.module.scss'

interface iProps {
  posts: Array<IPostImage[]> | undefined
}

interface iSwiperItemProps {
  images: IPostImage[]
}

interface iSwiperImageProps {
  image: IPostImage
}

export const PostsShower = memo(({ posts }: iProps) => {
  const t = useRouterLocaleDefinition()

  const postsWithSwiper = posts?.map(post => <SwiperItem images={post} key={'123'} />)

  return (
    <div className={s.postsShower}>
      {posts ? (
        postsWithSwiper
      ) : (
        <Typography variant={'h1'}>😥 {t.profile.postsShower.noPostsTitle} 😥</Typography>
      )}
    </div>
  )
})

const SwiperItem = memo(({ images }: iSwiperItemProps) => {
  const firstImage = images[0]

  return (
    <div className={s.swiperItem}>
      {images.length > 1 ? (
        <SwiperSlider
          customClass={s.swiperSlider}
          navigation
          paginationClickable
          slides={images.map(image => ({
            content: <SwiperImage image={image} />,
          }))}
          spaceBetween={20}
        />
      ) : (
        <SwiperImage image={firstImage} />
      )}
    </div>
  )
})

const SwiperImage = memo(({ image }: iSwiperImageProps) => {
  return <Image alt={`img-${image.fileSize}`} height={230} src={image.url} width={230} />
})
