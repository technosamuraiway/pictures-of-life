import { ReactNode, memo, useMemo, useState } from 'react'
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
import { UserMessageItem } from '@/widgets/profile/profilePostModal/postComments/comments/commentsItem/userMessageItem/UserMessageItem'
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

  // const { data: answersLikes, isLoading: isLoadingAnswersLikes } = useGetAnswersLikesQuery(
  //   {
  //     answerId: answers?.items[0].id || NaN,
  //     commentId,
  //     postId,
  //   },
  //   { skip: !answers }
  // )

  const [createNewAnswer, { isLoading: isLoadingCreateAnswer }] = useCreateNewAnswerMutation()
  const [updateLike, { isLoading: isLoadingLike }] = useUpdateLikeStatusOfCommentMutation()

  const [isShowAnswers, setIsShowAnswers] = useState(false)
  const [isShowAnswerInput, setIsShowAnswerInput] = useState(false)

  const isLoading = isLoadingAnswers || isLoadingLike || isLoadingCreateAnswer

  const isOwnComment = meData?.userId === id
  const isShow = !isOwnComment && !!meData

  const answersCount = answers?.items.length

  function likeHandler() {
    updateLike({ commentId, likeStatus: isLiked ? 'NONE' : 'LIKE', postId })
  }

  function showAnswersWithInput() {
    setIsShowAnswers(!isShowAnswers)
    setIsShowAnswerInput(!isShowAnswers)
  }

  async function onAddAnswer(data: PostCommentFormZodSchema) {
    try {
      await createNewAnswer({ commentId, content: data.comment, postId }).unwrap()

      if (!isShowAnswers) {
        showAnswersWithInput()
      }
    } catch (error) {
      toast.error('ERROR')
    }
  }

  const sortedAnswers = useMemo(() => {
    return answers?.items
      ? [...answers.items].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : []
  }, [answers])

  if (!comment) {
    return (
      <li>
        <Skeleton className={s.skeleton} height={90} width={'100%'} />
      </li>
    )
  }

  const CommentsItemAnswers = (
    <ul className={s.answers}>
      {sortedAnswers.map(answer => (
        <UserMessageItem item={answer} key={answer.id} postId={postId} />
      ))}
    </ul>
  )

  const answerUi = (
    <div className={s.answer}>
      <Typography
        as={'button'}
        onClick={showAnswersWithInput}
        type={'button'}
        variant={'small-text'}
      >
        {isShowAnswers ? t.profile.modal.answers.hide : t.profile.modal.answers.show}{' '}
        {t.profile.modal.answers.answers} ({answersCount})
      </Typography>
      {isShowAnswers && CommentsItemAnswers}
    </div>
  )

  /* размер иконки изменялся, решение - обернул span с заданными размерами */
  function iconWrapper(icon: ReactNode) {
    return <span style={{ display: 'block', height: '16px', width: '16px' }}>{icon}</span>
  }

  const icon = isLiked
    ? iconWrapper(
        <FilledLikeIcon
          className={s.like}
          height={16}
          onClick={likeHandler}
          style={{ color: 'red' }}
          width={16}
        />
      )
    : iconWrapper(<LikeIcon className={s.like} height={16} onClick={likeHandler} width={16} />)

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
          <Typography variant={'small-text'}>
            {t.profile.modal.answers.likes}: {likeCount}
          </Typography>
        )}

        {!!meData && (
          <Typography
            as={'button'}
            onClick={() => !isShowAnswers && setIsShowAnswerInput(!isShowAnswerInput)}
            type={'button'}
            variant={'small-text'}
          >
            {t.profile.modal.answers.answer}
          </Typography>
        )}
      </div>
      {!!meData && !!answersCount && answerUi}
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
