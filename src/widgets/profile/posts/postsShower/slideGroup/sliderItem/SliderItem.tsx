import { memo } from 'react'

import Image, { StaticImageData } from 'next/image'

interface iSlideItem {
  alt: string
  src: StaticImageData | string
}

export const SlideItem = memo(({ alt, src }: iSlideItem) => {
  return <Image alt={alt} height={230} src={src} width={230} />
})
