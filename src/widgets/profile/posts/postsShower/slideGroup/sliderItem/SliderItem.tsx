import { memo } from 'react'

import { PATH } from '@/shared'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

interface iSlideItem {
  alt: string
  id: number
  src: StaticImageData | string
}

export const SlideItem = memo(({ alt, id, src }: iSlideItem) => {
  // const { push, query } = useRouter()
  //
  // function toProfilePostModalHandler() {
  //   push({ pathname: `${PATH.PROFILE.BASEPROFILE}` + '123' })
  // }

  return <Image alt={alt} height={230} src={src} width={230} />
})
