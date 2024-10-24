import { memo } from 'react'

import { IPostImage } from '@/services'

import s from './ProfilePost.module.scss'

import { PostComments } from './postComments/PostComments'
import { PostImage } from './postImage/PostImage'

interface iProps {
  images: IPostImage[]
}

export const ProfilePost = memo(({ images }: iProps) => {
  return (
    <div className={s.root}>
      <PostImage images={images} />
      <PostComments />
    </div>
  )
})
