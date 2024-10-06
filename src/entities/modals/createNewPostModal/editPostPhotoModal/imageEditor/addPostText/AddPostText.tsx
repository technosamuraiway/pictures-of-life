import s from './AddPostText.module.scss'

import { PostLocations } from './postLocations/PostLocations'
import { PostText } from './postText/PostText'

export const AddPostText = () => {
  return (
    <div className={s.addPostTextWrapper}>
      <PostText />
      <PostLocations />
    </div>
  )
}
