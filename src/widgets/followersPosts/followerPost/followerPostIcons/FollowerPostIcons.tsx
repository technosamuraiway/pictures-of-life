import { toast } from 'react-toastify'

import { useUpdatePostLikeStatusMutation } from '@/services'
import { PATH, RequestLineLoader } from '@/shared'
import { BookmarkIcon, FilledLikeIcon, LikeIcon, MessageIcon } from '@public/icons'
import { DefaultMessengerIcon } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './FollowerPostIcons.module.scss'

interface IProps {
  isLiked: boolean
  postId: number
  userId: number
}

export const FollowerPostIcons = ({ isLiked, postId, userId }: IProps) => {
  const { push } = useRouter()
  const [putLike, { isLoading: isPutLikeLoading }] = useUpdatePostLikeStatusMutation()

  async function likeHandler() {
    await putLike({ likeStatus: 'LIKE', postId: Number(postId) })
  }

  async function unLikeHandler() {
    await putLike({ likeStatus: 'NONE', postId: Number(postId) })
  }

  const clickMessageHandler = () => {
    push(`${PATH.MESSENGER}/${userId}`)
  }

  const clickArrowHandler = () => {
    toast.info('Функционал не работает')
  }

  const clickBookmarkHandler = () => {
    toast.info('Функционал не работает')
  }

  return (
    <>
      {isPutLikeLoading && <RequestLineLoader />}
      <div className={s.wrapper}>
        {isLiked ? (
          <FilledLikeIcon
            className={clsx(s.icon, s.likeIconFilled)}
            height={24}
            onClick={unLikeHandler}
            width={24}
          />
        ) : (
          <LikeIcon className={s.icon} onClick={likeHandler} />
        )}
        <DefaultMessengerIcon
          className={s.icon}
          height={24}
          onClick={clickMessageHandler}
          width={24}
        />
        <MessageIcon className={s.icon} onClick={clickArrowHandler} />
        <BookmarkIcon className={s.icon} onClick={clickBookmarkHandler} />
      </div>
    </>
  )
}
