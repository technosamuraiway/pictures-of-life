import { memo } from 'react'

import Image, { StaticImageData } from 'next/image'

import { openProfilePostModalFnc } from '../../../../lib/utils/openProfilePostModalFnc'

interface IProps {
  alt: string
  imgHeight: number
  imgWidth: number
  postId: number
  src: StaticImageData | string
}

export const PostsItemJustSlide = memo(({ alt, imgHeight, imgWidth, postId, src }: IProps) => {
  return (
    <Image
      alt={alt}
      height={imgHeight}
      onClick={openProfilePostModalFnc(String(postId))}
      src={src}
      width={imgWidth}
    />
  )
})
