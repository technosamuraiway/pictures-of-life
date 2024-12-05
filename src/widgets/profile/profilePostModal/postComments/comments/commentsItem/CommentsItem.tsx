import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { IComment, useGetAnswersQuery } from '@/services'
import {
  useCreateNewAnswerMutation,
  useUpdateLikeStatusOfCommentMutation,
} from '@/services/flow/commentsAnswers.service'
import {
  CircleAvatar,
  RequestLineLoader,
  Skeleton,
  TimeAgo,
  useRouterLocaleDefinition,
} from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { PostCommentFormZodSchema } from '@/widgets/profile/lib/zod/postCommentsFormZodSchema'
import { PostAddAnswer } from '@/widgets/profile/profilePostModal/postComments/comments/commentsItem/PostAddAnswer/PostAddAnswer'
import { CommentsItemAnswers } from '@/widgets/profile/profilePostModal/postComments/comments/commentsItem/commentsItemAnswers/CommentsItemAnswers'
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

  const { data: answers, isLoading: isLoadingAnswers } = useGetAnswersQuery(
    { commentId, postId },
    { skip: !meData }
  )
  const [createNewAnswer] = useCreateNewAnswerMutation()

  // const { data: answersLikes, isLoading: isLoadingAnswersLikes } = useGetAnswersLikesQuery(
  //   {
  //     answerId: answers?.items[0].id || NaN,
  //     commentId,
  //     postId,
  //   },
  //   { skip: !answers }
  // )

  const [updateLike, { isLoading: isLoadingLike }] = useUpdateLikeStatusOfCommentMutation()

  const [isShowAnswers, setIsShowAnswers] = useState(false)
  const [isShowAnswerInput, setIsShowAnswerInput] = useState(false)

  const isLoading = isLoadingAnswers || isLoadingLike

  const isOwnComment = meData?.userId === id
  const isShow = !isOwnComment && !!meData

  const answersCount = answers?.items.length

  function likeHandler() {
    updateLike({ commentId, likeStatus: isLiked ? 'NONE' : 'LIKE', postId })
  }

  async function onAddAnswer(data: PostCommentFormZodSchema) {
    try {
      await createNewAnswer({ commentId, content: data.comment, postId }).unwrap()
      setIsShowAnswerInput(false)
      setIsShowAnswers(true)
    } catch (error) {
      toast.error('ERROR')
    }
  }

  if (!comment) {
    return (
      <li>
        <Skeleton className={s.skeleton} height={90} width={'100%'} />
      </li>
    )
  }

  const answerUi = (
    <span className={s.answer} onClick={() => setIsShowAnswers(!isShowAnswers)}>
      <Typography as={'button'} type={'button'} variant={'small-text'}>
        {isShowAnswers ? 'Hide' : 'Show'} Answers ({answersCount})
      </Typography>
      {isShowAnswers && <CommentsItemAnswers />}
    </span>
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

        {isShow && (
          <Typography
            as={'button'}
            onClick={() => setIsShowAnswerInput(!isShowAnswerInput)}
            type={'button'}
            variant={'small-text'}
          >
            Answer
          </Typography>
        )}
      </div>
      {isShow && !!answersCount && answerUi}
      {isShowAnswerInput && (
        <PostAddAnswer onAddAnswer={onAddAnswer} onCloseForm={setIsShowAnswerInput} />
      )}
    </div>
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
})
