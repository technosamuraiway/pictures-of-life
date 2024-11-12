import { useGetPublicPostCommentsByIdQuery } from '@/services/flow/publicPosts.service'
import { useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import s from './Comments.module.scss'

import { CommentsItem } from './commentsItem/CommentsItem'

export const Comments = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()

  const { postId } = query

  const { data: comments, isLoading } = useGetPublicPostCommentsByIdQuery(
    { postId: Number(postId) ?? null },
    { skip: !postId }
  )

  return (
    <ul className={s.root}>
      {comments?.items?.map(item => <CommentsItem comment={item} key={item.id} />)}
    </ul>
  )
}
