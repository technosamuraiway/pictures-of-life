import { AvatarWithUserName } from '@/shared'
import testImg from '@public/mockAvatar.png'

import s from './FollowerPost.module.scss'

export const FollowerPost = () => {
  const navigateToProfileHandler = () => {
    // navigateToProfile(String(item.userId))
  }

  return (
    <div className={s.wrapper}>
      <div>
        <AvatarWithUserName
          avatar={testImg.src}
          navigateToProfile={navigateToProfileHandler}
          textVariant={'h3'}
          userName={'URL'}
        />
      </div>
      Post
    </div>
  )
}
