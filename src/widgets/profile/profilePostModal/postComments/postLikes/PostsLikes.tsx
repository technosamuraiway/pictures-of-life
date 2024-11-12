import { useMemo } from 'react'

import {
  useGetPublicPostByIdQuery,
  useGetPublicPostCommentsByIdQuery,
} from '@/services/flow/publicPosts.service'
import { Skeleton, useRouterLocaleDefinition } from '@/shared'
import { formatDate } from '@/shared/utils/dateFormatter'
import { BookmarkIcon, LikeIcon, MessageIcon } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './PostsLikes.module.scss'

export const PostsLikes = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()

  const { postId } = query

  const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery(
    (postId as string) || '',
    { skip: !postId }
  )
  const { data: comments, isLoading: isCommentsLoading } = useGetPublicPostCommentsByIdQuery(
    { postId: Number(postId) ?? null },
    { skip: !postId }
  )

  const isLoading = isPostLoading || isCommentsLoading

  const avatarsWhoLikes = useMemo(() => {
    return post?.avatarWhoLikes.slice(0, 3)
  }, [post])

  const avatars = !!avatarsWhoLikes?.length && (
    <div className={s.avatarsBox}>
      {avatarsWhoLikes?.map((avatar, index) => (
        <Image alt={`User avatar ${index + 1}`} className={s.avatar} key={index} src={avatar} />
      ))}
    </div>
  )

  const iconsBox = (
    <div className={s.iconsBox}>
      <LikeIcon />
      <MessageIcon />
      <BookmarkIcon />
    </div>
  )

  const contentBox = (
    <div className={s.contentBox}>
      <div className={s.likes}>
        {isLoading ? <Skeleton height={20} width={60} /> : avatars}

        {isLoading ? (
          <Skeleton height={20} width={60} />
        ) : (
          <span>
            {post?.likesCount}
            <strong> &quot;Likes&quot;</strong>
          </span>
        )}
      </div>

      {isLoading ? (
        <Skeleton height={10} width={60} />
      ) : (
        <Typography className={s.date} variant={'small-text'}>
          {formatDate(post?.createdAt || '', t)}
        </Typography>
      )}
    </div>
  )

  return (
    <div className={s.root}>
      {iconsBox}
      {contentBox}
    </div>
  )
}
