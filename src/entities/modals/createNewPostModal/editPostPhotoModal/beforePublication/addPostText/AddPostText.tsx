import { Dispatch, SetStateAction } from 'react'

import s from './AddPostText.module.scss'

import { PostLocations } from './postLocations/PostLocations'
import { PostText } from './postText/PostText'

interface IProps {
  postDescription: string
  setPostDescription: Dispatch<SetStateAction<string>>
}

export const AddPostText = ({ postDescription, setPostDescription }: IProps) => {
  return (
    <div className={s.addPostTextWrapper}>
      <PostText postDescription={postDescription} setPostDescription={setPostDescription} />
      <PostLocations />
    </div>
  )
}
