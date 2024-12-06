import { toast } from 'react-toastify'

import { useUpdatePostLikeStatusMutation } from '@/services'
import { RequestLineLoader } from '@/shared'
import { BookmarkIcon, FilledLikeIcon, LikeIcon, MessageIcon } from '@public/icons'
import { DefaultMessengerIcon } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './FollowerPostIcons.module.scss'

interface IProps {
  isLiked: boolean
  postId: number
}

export const FollowerPostIcons = ({ isLiked, postId }: IProps) => {
  const [putLike, { isLoading: isPutLikeLoading }] = useUpdatePostLikeStatusMutation()

  async function likeHandler() {
    await putLike({ likeStatus: 'LIKE', postId: Number(postId) })
  }

  async function unLikeHandler() {
    await putLike({ likeStatus: 'NONE', postId: Number(postId) })
  }

  const clickMessageHandler = () => {
    toast.info('Функционал не работает')
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
