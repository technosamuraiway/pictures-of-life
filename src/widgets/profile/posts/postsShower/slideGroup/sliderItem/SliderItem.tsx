import { memo } from 'react'

import { openProfilePostModal } from '@/widgets/profile/lib/utils/openProfilePostModal'
import Image, { StaticImageData } from 'next/image'

interface iSlideItem {
  alt: string
  id: number
  src: StaticImageData | string
}

export const SlideItem = memo(({ alt, id, src }: iSlideItem) => {
  return (
    <Image
      alt={alt}
      height={230}
      onClick={openProfilePostModal(String(id))}
      src={src}
      width={230}
    />
  )
})
