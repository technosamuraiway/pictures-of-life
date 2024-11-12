import { memo } from 'react'

import { IComment } from '@/services'
import { CircleAvatar, Skeleton } from '@/shared'
import { FilledLikeIcon, LikeIcon } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './CommentsItem.module.scss'

interface IProps {
  className?: string
  comment: IComment
}

export const CommentsItem = memo(({ className, comment }: IProps) => {
  const { content, createdAt, from, isLiked, likeCount } = comment
  const { avatars, username } = from

  if (!comment) {
    return (
      <li>
        <Skeleton className={s.skeleton} height={90} width={'100%'} />
      </li>
    )
  }

  const icon = isLiked ? (
    <FilledLikeIcon height={16} style={{ color: 'red' }} width={16} />
  ) : (
    <LikeIcon height={16} width={16} />
  )

  const contentItem = (
    <div className={s.content}>
      <Typography className={s.username} variant={'bold-text-14'}>
        {username}
      </Typography>{' '}
      <Typography className={s.content} variant={'medium-text-14'}>
        {content}
      </Typography>
    </div>
  )

  return (
    <li className={clsx(className, s.root)}>
      <CircleAvatar src={avatars[0].url} />
      {contentItem}
      {icon}
    </li>
  )
})
