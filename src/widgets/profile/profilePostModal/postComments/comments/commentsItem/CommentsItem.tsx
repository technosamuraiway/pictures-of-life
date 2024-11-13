import { memo } from 'react'

import { IComment } from '@/services'
import { useUpdateLikeStatusOfCommentMutation } from '@/services/flow/commentsAnswers.service'
import { CircleAvatar, Skeleton, TimeAgo, useRouterLocaleDefinition } from '@/shared'
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
  const { content, createdAt, from, id: commentId, isLiked, likeCount, postId } = comment
  const { avatars, id, username } = from

  const isOwnComment = meData?.userId === id

  const [updateLike, { isLoading: isLoadingLike }] = useUpdateLikeStatusOfCommentMutation()

  function likeHandler() {
    updateLike({ commentId, likeStatus: 'LIKE', postId })
  }

  function unLikeHandler() {
    // updateLike({ commentId, likeStatus: 'NONE', postId })
    console.log('noLike')
  }

  if (!comment) {
    return (
      <li>
        <Skeleton className={s.skeleton} height={90} width={'100%'} />
      </li>
    )
  }

  const icon = isLiked ? (
    <FilledLikeIcon height={16} onClick={unLikeHandler} style={{ color: 'red' }} width={16} />
  ) : (
    <LikeIcon height={16} onClick={likeHandler} width={16} />
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
        <Typography variant={'small-text'}>{TimeAgo(createdAt, t)}</Typography>
        <Typography variant={'small-text'}>Likes: {likeCount}</Typography>
        {!isOwnComment && (
          <Typography as={'button'} type={'button'} variant={'small-text'}>
            Answer
          </Typography>
        )}
      </div>
    </div>
  )

  return (
    <li className={clsx(className, s.root)}>
      <CircleAvatar src={avatars[0].url} />
      {contentItem}
      {!isOwnComment && icon}
    </li>
  )
})
