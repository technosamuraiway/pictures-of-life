import { PostImage, SwiperSlider } from '@/shared'
import emptyImg from '@public/mockAvatar.png'

import { SliderAdminItem } from './sliderAdminItem/SliderAdminItem'

interface IProps {
  images: PostImage[]
  onImageClick: () => void
}

export const SliderAdminPost = ({ images, onImageClick }: IProps) => {
  if (images.length === 0) {
    return <SliderAdminItem onClick={onImageClick} src={emptyImg.src} />
  }

  const firstImage = images[0]

  const imagesGroupWithSwiper = (
    <SwiperSlider
      slides={images.map(image => ({
        content: <SliderAdminItem onClick={onImageClick} src={image.url || emptyImg.src} />,
        id: image.id,
      }))}
    />
  )

  const onlyOneImage = (
    <SliderAdminItem onClick={onImageClick} src={firstImage.url || emptyImg.src} />
  )

  return images.length > 1 ? imagesGroupWithSwiper : onlyOneImage
}
