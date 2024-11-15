import { memo } from 'react'

import { CircleAvatar } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './PostsCommentsHeader.module.scss'

import { PostModalHeaderDropdownDotsMenu } from './postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu'
import { PostModalHeaderOwnDropdownDotsMenu } from './postModalHeaderOwnDropdownDotsMenu/PostModalHeaderOwnDropdownDotsMenu'

interface IProps {
  avatar: string
  isAuthorized: boolean
  isOwnProfile: boolean
  rootCN?: string
  userName: string
}

export const PostCommentsHeader = memo(
  ({ avatar, isAuthorized, isOwnProfile, rootCN, userName }: IProps) => {
    const isFriendPost = isAuthorized && !isOwnProfile

    return (
      <div className={clsx(rootCN, s.root)}>
        <CircleAvatar rootCN={s.circleAvatar} src={avatar} />
        <Typography className={s.userName} variant={'bold-text-16'}>
          {userName}
        </Typography>
        {isOwnProfile && <PostModalHeaderOwnDropdownDotsMenu />}
        {isFriendPost && <PostModalHeaderDropdownDotsMenu userName={userName} />}
      </div>
    )
  }
)
