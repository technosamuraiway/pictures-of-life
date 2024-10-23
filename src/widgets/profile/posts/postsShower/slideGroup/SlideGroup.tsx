import { memo } from 'react'

import { IPostImage } from '@/services'
import { SwiperSlider } from '@/shared'

import { SlideItem } from './sliderItem/SliderItem'

interface iSlideGroup {
  id: number
  images: IPostImage[]
}

export const SlideGroup = memo(({ id, images }: iSlideGroup) => {
  const firstImage = images[0]

  const postsGroupWithSwiper = (
    <SwiperSlider
      navigation
      paginationClickable
      slides={images.map(image => ({
        content: <SlideItem alt={image.uploadId} id={id} src={image.url} />,
      }))}
      spaceBetween={20}
    />
  )

  const onlyOnePost = <SlideItem alt={firstImage.uploadId} id={id} src={firstImage.url} />

  return <>{images.length > 1 ? postsGroupWithSwiper : onlyOnePost}</>
})
