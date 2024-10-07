import { useMemo } from 'react'

import { IUploadPostImagesResponse } from '@/services'
import { SwiperSlider } from '@/shared'
import Image from 'next/image'

import s from './ShowSlides.module.scss'

interface IProps {
  uploadImagesResult?: IUploadPostImagesResponse
}

export const ShowSlides = ({ uploadImagesResult }: IProps) => {
  const slides = useMemo(() => {
    return (
      uploadImagesResult?.images.map(image => ({
        content: <SwiperImage src={image.url} />,
      })) || []
    )
  }, [uploadImagesResult])

  return (
    <div className={s.swiperWrapper}>
      {uploadImagesResult &&
        (uploadImagesResult?.images.length > 1 ? (
          <SwiperSlider
            customClass={'customSwiperClass'}
            loop
            navigation
            paginationClickable
            slides={slides}
            slidesPerView={1}
            spaceBetween={20}
          />
        ) : (
          <SwiperImage src={uploadImagesResult?.images[0].url} />
        ))}
    </div>
  )
}

interface ISwiperImage {
  className?: string
  src: string
}

const SwiperImage = ({ className, src }: ISwiperImage) => {
  return <Image alt={'Your post image'} className={className} height={504} src={src} width={490} />
}
