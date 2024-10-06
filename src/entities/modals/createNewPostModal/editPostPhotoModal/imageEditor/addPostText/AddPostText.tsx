import s from './AddPostText.module.scss'

import { PostLocations } from './postLocations/PostLocations'

export const AddPostText = () => {
  return (
    <div className={s.addPostTextWrapper}>
      <div className={s.postWrapper}>Post</div>
      <PostLocations />
    </div>
  )
}
