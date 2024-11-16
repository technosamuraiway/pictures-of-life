import {
  useGetPublicPostByIdQuery,
  useGetPublicPostCommentsByIdQuery,
} from '@/services/flow/publicPosts.service'
import { RequestLineLoader, Skeleton } from '@/shared'
import { Scrollbar } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Comments.module.scss'

import { CommentsItem } from './commentsItem/CommentsItem'
import { PostDescription } from './postDescription/PostDescription'

export const Comments = () => {
  const { query } = useRouter()

  const { postId } = query

  const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery(postId as string)
  const { data: comments, isLoading: isCommentsLoading } = useGetPublicPostCommentsByIdQuery(
    { postId: Number(postId) ?? null },
    { skip: !postId }
  )
  const isLoading = isPostLoading || isCommentsLoading

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <Scrollbar className={s.root}>
        {!isLoading && (
          <PostDescription
            avatar={post?.avatarOwner || ''}
            description={post?.description || '🍪🍪🍪'}
            updatedAt={post?.updatedAt || ''}
            userName={post?.userName || ''}
          />
        )}

        <ul className={s.list}>
          {!isLoading &&
            comments?.items?.map(item => <CommentsItem comment={item} key={item.id} />)}
          {isLoading && [1, 2, 3].map(skeleton => <Skeleton height={50} key={skeleton} />)}
        </ul>
      </Scrollbar>
    </>
  )
}
