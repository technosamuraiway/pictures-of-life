import { memo } from 'react'

import { CircleAvatar } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './PostsCommentsHeader.module.scss'

import { PostModalHeaderDropdownDotsMenu } from './postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu'

interface IProps {
  avatar: string
  isOwnProfile: boolean
  rootCN?: string
  userName: string
}

export const PostCommentsHeader = memo(({ avatar, isOwnProfile, rootCN, userName }: IProps) => {
  return (
    <div className={clsx(rootCN, s.root)}>
      <CircleAvatar rootCN={s.circleAvatar} src={avatar} />
      <Typography className={s.userName} variant={'bold-text-16'}>
        {userName}
      </Typography>
      {isOwnProfile && <PostModalHeaderDropdownDotsMenu />}
    </div>
  )
})
