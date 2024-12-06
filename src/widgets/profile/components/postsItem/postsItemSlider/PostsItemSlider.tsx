import { memo } from 'react'

import { IPostImage } from '@/services'
import { SwiperSlider } from '@/shared'

import { PostsItemJustSlide } from './postsItemJustSlide/PostsItemJustSlide'

interface IProps {
  iSClick?: boolean
  images: IPostImage[]
  imgHeight: number
  imgWidth: number
  postId: number
}

export const PostsItemSlider = memo(({ iSClick, images, imgHeight, imgWidth, postId }: IProps) => {
  const firstImage = images[0]

  const commonProps = { iSClick, imgHeight, imgWidth, postId }

  const postsGroupWithSwiper = (
    <SwiperSlider
      navigation
      paginationClickable
      slides={images.map(image => ({
        content: <PostsItemJustSlide alt={image.uploadId} src={image.url} {...commonProps} />,
      }))}
      spaceBetween={20}
    />
  )

  const onlyOnePost = (
    <PostsItemJustSlide alt={firstImage.uploadId} src={firstImage.url} {...commonProps} />
  )

  return <>{images.length > 1 ? postsGroupWithSwiper : onlyOnePost}</>
})
