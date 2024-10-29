import { memo } from 'react'

import { IPostImage } from '@/services'
import { ImageNotFound } from '@public/ImageNotFound'

import { openProfilePostModalFnc } from '../../lib/utils/openProfilePostModalFnc'
import { PostsItemSlider } from './postsItemSlider/PostsItemSlider'

interface IProps {
  images: IPostImage[]
  imgHeight: number
  imgWidth: number
  postId: number
  rootCN?: string
}

export const PostsItem = memo(({ images, imgHeight, imgWidth, postId, rootCN }: IProps) => {
  const isWithImages = images.length > 0

  const imagesWithSlider = (
    <PostsItemSlider images={images} imgHeight={imgHeight} imgWidth={imgWidth} postId={postId} />
  )

  const noImage = (
    <ImageNotFound
      height={imgHeight}
      onClick={openProfilePostModalFnc(String(postId))}
      width={imgWidth}
    />
  )

  return <div className={rootCN}>{isWithImages ? imagesWithSlider : noImage}</div>
})
