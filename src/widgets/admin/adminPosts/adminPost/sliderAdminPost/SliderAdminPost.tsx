import { PostImage, SwiperSlider } from '@/shared'
import emptyImg from '@public/mockAvatar.png'

import s from './SliderAdminPost.module.scss'

import { SliderAdminItem } from './sliderAdminItem/SliderAdminItem'

interface IProps {
  expandedPosts: Record<string, boolean>
  id: null | number
  images: PostImage[]
  onImageClick: () => void
}

export const SliderAdminPost = ({ expandedPosts, id, images, onImageClick }: IProps) => {
  const heightImg = expandedPosts[id || 0] ? 100 : 240

  if (images.length === 0) {
    return <SliderAdminItem height={heightImg} onClick={onImageClick} src={emptyImg.src} />
  }

  const firstImage = images[0]

  const imagesGroupWithSwiper = (
    <SwiperSlider
      slides={images.map(image => ({
        content: (
          <SliderAdminItem
            height={heightImg}
            onClick={onImageClick}
            src={image.url || emptyImg.src}
          />
        ),
        id: image.id,
      }))}
    />
  )

  const onlyOneImage = (
    <SliderAdminItem
      height={heightImg}
      onClick={onImageClick}
      src={firstImage.url || emptyImg.src}
    />
  )

  return (
    <div className={expandedPosts[id || 0] ? s.expandedImageContainer : s.imageContainer}>
      {images.length > 1 ? imagesGroupWithSwiper : onlyOneImage}
    </div>
  )
}
