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
  name: string
  rootCN?: string
  userName: string
}

export const PostCommentsHeader = memo(
  ({ avatar, isAuthorized, isOwnProfile, name, rootCN, userName }: IProps) => {
    const isFriendPost = isAuthorized && !isOwnProfile

    return (
      <div className={clsx(rootCN, s.root)}>
        <CircleAvatar name={name} rootCN={s.circleAvatar} src={avatar} />
        <Typography className={s.userName} variant={'bold-text-16'}>
          {userName}
        </Typography>
        {isOwnProfile && <PostModalHeaderOwnDropdownDotsMenu />}
        {isFriendPost && <PostModalHeaderDropdownDotsMenu />}
      </div>
    )
  }
)
