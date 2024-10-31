import { memo } from 'react'

import { CircleAvatar } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './PostsCommentsHeader.module.scss'

import { useCloseProfilePostModalWithRouter } from '../../../lib/hooks/useCloseProfilePostModalWithRouter'

interface IProps {
  avatar: string
  rootCN?: string
  userName: string
}

export const PostCommentsHeader = memo(({ avatar, rootCN, userName }: IProps) => {
  const { close, query } = useCloseProfilePostModalWithRouter()

  return (
    <div className={clsx(rootCN, s.root)}>
      <CircleAvatar rootCN={s.circleAvatar} src={avatar} />
      <Typography variant={'bold-text-16'}>{userName}</Typography>
    </div>
  )
})
