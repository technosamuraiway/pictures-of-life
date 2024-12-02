import { useGetPostCommentsByIdQuery } from '@/services'
import {
  useGetPublicPostByIdQuery,
  useGetPublicPostCommentsByIdQuery,
} from '@/services/flow/publicPosts.service'
import { RequestLineLoader, Skeleton } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { Scrollbar } from '@technosamurai/techno-ui-kit'

import s from './Comments.module.scss'

import { CommentsItem } from './commentsItem/CommentsItem'
import { PostDescription } from './postDescription/PostDescription'

export const Comments = () => {
  const { meData, router } = useMeWithRouter()
  const { query } = router

  const { postId, userId } = query

  const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery(postId as string, {
    skip: !postId,
  })

  const { data: commentsPublic, isLoading: isCommentsPublicLoading } =
    useGetPublicPostCommentsByIdQuery(
      { postId: Number(postId) ?? null },
      { skip: !postId || !!meData }
    )

  const { data: commentsAuth, isLoading: isCommentsAuthLoading } = useGetPostCommentsByIdQuery(
    Number(postId) ?? null,
    { skip: !postId || !meData }
  )

  const comments = commentsAuth || commentsPublic

  const isLoading = isPostLoading || isCommentsPublicLoading || isCommentsAuthLoading

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
