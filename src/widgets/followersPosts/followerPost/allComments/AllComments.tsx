import { useState } from 'react'

import { useGetPublicPostCommentsByIdQuery } from '@/services/flow/publicPosts.service'
import { useRouterLocaleDefinition } from '@/shared'
import { Comments } from '@/widgets/profile/profilePostModal/postComments/comments/Comments'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './AllComments.module.scss'

interface IProps {
  postId: number
  userId: number
}

export const AllComments = ({ postId, userId }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openComments, setOpenComments] = useState(false)

  const { data: commentsData } = useGetPublicPostCommentsByIdQuery({ postId })

  return openComments ? (
    <>
      <Typography
        className={s.text}
        onClick={() => setOpenComments(!openComments)}
        variant={'bold-text-14'}
      >
        {t.profile.modal.hideAllComments} ({commentsData?.totalCount})
      </Typography>
      <Comments postIdProps={postId} userIdProps={userId} />
    </>
  ) : (
    <Typography
      className={s.text}
      onClick={() => setOpenComments(!openComments)}
      variant={'bold-text-14'}
    >
      {t.profile.modal.showAllComments} ({commentsData?.totalCount})
    </Typography>
  )
}
