import { memo } from 'react'

import { IPostImage } from '@/services'
import { ImageNotFound } from '@public/ImageNotFound'

import s from './PostImage.module.scss'

interface iProps {
  images: IPostImage[]
}

export const PostImage = memo(({ images }: iProps) => {
  const isWithImage = images.length > 0

  return (
    <>
      {isWithImage ? (
        <div className={s.root}>images</div>
      ) : (
        <div className={s.root}>
          <ImageNotFound height={230} width={230} />
        </div>
      )}
    </>
  )
})
