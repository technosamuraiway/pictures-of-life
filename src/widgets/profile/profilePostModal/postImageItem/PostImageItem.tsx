import { memo } from 'react'

import { IPostImage } from '@/services'
import { ImageNotFound } from '@public/ImageNotFound'

import s from './PostImageItem.module.scss'

interface iProps {
  images: IPostImage[] | undefined
}

export const PostImageItem = memo(({ images }: iProps) => {
  // если нет postId в query то images[postId] === undefined
  if (images === undefined) {
    return null
  }

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
