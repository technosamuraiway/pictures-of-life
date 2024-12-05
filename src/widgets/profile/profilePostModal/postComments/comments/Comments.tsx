import { useMemo, useRef } from 'react'

import { ICommentResponse, useGetPostCommentsByIdQuery } from '@/services'
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

  const sortedComments = useMemo<ICommentResponse | undefined>(() => {
    if (!comments || !comments.items) {
      return undefined
    }

    const currentUserId = Number(userId)

    const sortedItems = [...comments.items].sort((a, b) => {
      // Сначала сортируем по принадлежности текущему пользователю
      if (a.from.id === currentUserId && b.from.id !== currentUserId) {
        return -1
      }
      if (a.from.id !== currentUserId && b.from.id === currentUserId) {
        return 1
      }

      // Затем сортируем по дате (от новых к старым)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return { ...comments, items: sortedItems }
  }, [comments, userId])

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
            sortedComments?.items?.map(item => <CommentsItem comment={item} key={item.id} />)}
          {isLoading && [1, 2, 3].map(skeleton => <Skeleton height={50} key={skeleton} />)}
        </ul>
      </Scrollbar>
    </>
  )
}
