import { Answer } from '@/services'
import { useUpdateLikeStatusOfAnswerMutation } from '@/services/flow/commentsAnswers.service'
import { CircleAvatar, RequestLineLoader, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { FilledLikeIcon, LikeIcon } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './UserMessageItem.module.scss'

type Props = {
  className?: string
  item: Answer
  postId: number
}

export const UserMessageItem = ({ className, item, postId }: Props) => {
  const t = useRouterLocaleDefinition()
  const { meData } = useMeWithRouter()
  const { commentId, content, createdAt, from, id: answerId, isLiked, likeCount } = item
  const { avatars, id, username } = from

  const isOwnComment = meData?.userId === id
  const isShow = !isOwnComment && !!meData

  const [updateLike, { isLoading: isLoadingLike }] = useUpdateLikeStatusOfAnswerMutation()

  const isLoading = isLoadingLike

  function likeHandler() {
    updateLike({ answerId, commentId, likeStatus: isLiked ? 'NONE' : 'LIKE', postId })
  }

  const contentItem = (
    <div className={clsx(s.content, !isShow && s.contentWithoutLike)}>
      <div className={s.text}>
        <Typography className={s.username} variant={'bold-text-14'}>
          {username}
        </Typography>
        :{' '}
        <Typography className={s.content} variant={'medium-text-14'}>
          {content}
        </Typography>
      </div>
      <div className={s.info}>
        <Typography variant={'small-text'}>{TimeAgo(createdAt, t)}</Typography>
        {!!meData && !!likeCount && (
          <Typography variant={'small-text'}>Likes: {likeCount}</Typography>
        )}
      </div>
    </div>
  )

  const icon = isLiked ? (
    <FilledLikeIcon
      className={s.like}
      height={16}
      onClick={likeHandler}
      style={{ color: 'red' }}
      width={16}
    />
  ) : (
    <LikeIcon className={s.like} height={16} onClick={likeHandler} width={16} />
  )

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <li className={clsx(className, s.root)}>
        <CircleAvatar src={avatars[0].url} />
        {contentItem}
        {isShow && icon}
      </li>
    </>
  )
}
