import { memo } from 'react'

import { IComment } from '@/services'
import { CircleAvatar, Skeleton, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { formatDate } from '@/shared/utils/dateFormatter'
import { FilledLikeIcon, LikeIcon } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './CommentsItem.module.scss'

interface IProps {
  className?: string
  comment: IComment
}

export const CommentsItem = memo(({ className, comment }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { meData } = useMeWithRouter()
  // const isOwnComment = meData.userId
  const { content, createdAt, from, isLiked, likeCount } = comment
  const { avatars, username } = from

  console.log(comment)

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
      <div className={s.text}>
        <Typography className={s.username} variant={'bold-text-14'}>
          {username}
        </Typography>{' '}
        <Typography className={s.content} variant={'medium-text-14'}>
          {content}
        </Typography>
      </div>
      <div className={s.info}>
        <Typography variant={'small-text'}>{formatDate(createdAt || '', t)}</Typography>
        <Typography variant={'small-text'}>Likes: {likeCount}</Typography>
      </div>
    </div>
  )

  return (
    <li className={clsx(className, s.root)}>
      <CircleAvatar src={avatars[0].url} />
      {contentItem}
      {!!meData && icon}
    </li>
  )
})
