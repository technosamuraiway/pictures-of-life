import { useGetPublicPostCommentsByIdQuery } from '@/services/flow/publicPosts.service'
import { RequestLineLoader, Skeleton } from '@/shared'
import { Scrollbar } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Comments.module.scss'

import { CommentsItem } from './commentsItem/CommentsItem'

export const Comments = () => {
  const { query } = useRouter()

  const { postId } = query

  const { data: comments, isLoading } = useGetPublicPostCommentsByIdQuery(
    { postId: Number(postId) ?? null },
    { skip: !postId }
  )

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <Scrollbar className={s.root}>
        <ul className={s.list}>
          {!isLoading &&
            comments?.items?.map(item => <CommentsItem comment={item} key={item.id} />)}
          {isLoading && [1, 2, 3].map(skeleton => <Skeleton height={50} key={skeleton} />)}
        </ul>
      </Scrollbar>
    </>
  )
}
