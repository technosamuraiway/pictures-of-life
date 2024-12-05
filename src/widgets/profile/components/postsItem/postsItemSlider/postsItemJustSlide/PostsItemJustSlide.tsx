import { memo } from 'react'

import Image, { StaticImageData } from 'next/image'

import { openProfilePostModalFnc } from '../../../../lib/utils/openProfilePostModalFnc'

interface IProps {
  alt: string
  iSClick?: boolean
  imgHeight: number
  imgWidth: number
  postId: number
  src: StaticImageData | string
}

export const PostsItemJustSlide = memo(
  ({ alt, iSClick = true, imgHeight, imgWidth, postId, src }: IProps) => {
    return (
      <Image
        alt={alt}
        height={imgHeight}
        onClick={iSClick ? openProfilePostModalFnc(String(postId)) : () => {}}
        priority
        src={src}
        width={imgWidth}
      />
    )
  }
)
