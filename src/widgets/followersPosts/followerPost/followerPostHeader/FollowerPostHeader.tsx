import { AvatarWithUserName, PATH, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { PostModalHeaderDropdownDotsMenu } from '@/widgets/profile/profilePostModal/postComments/postCommentsHeader/postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './FollowerPostHeader.module.scss'

interface IProps {
  avatarSrc: string
  createdAt: string
  postId: number
  userId: number
  userName: string
}

export const FollowerPostHeader = ({ avatarSrc, createdAt, postId, userId, userName }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.wrapper}>
      <div className={s.avatarWrapper}>
        <AvatarWithUserName
          avatar={avatarSrc}
          className={s.circle}
          textVariant={'h3'}
          userId={userId}
          userName={userName}
        />
        <Typography className={s.createdAt} variant={'small-text'}>
          {TimeAgo(createdAt || '', t)}
        </Typography>
      </div>
      <PostModalHeaderDropdownDotsMenu
        copyUrl={`${process.env.NEXT_PUBLIC_BASE_URL}${PATH.PROFILE.BASEPROFILE}/${userId}?postId=${postId}`}
        isRedirect={false}
        userIdProp={userId}
        userName={userName}
      />
    </div>
  )
}
