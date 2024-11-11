import { useMemo } from 'react'

import {
  useGetPublicPostByIdQuery,
  useGetPublicPostCommentsByIdQuery,
} from '@/services/flow/publicPosts.service'
import { useRouterLocaleDefinition } from '@/shared'
import { formatDate } from '@/shared/utils/dateFormatter'
import { BookmarkIcon, LikeIcon, MessageIcon } from '@public/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import mockAvatar from 'public/mockAvatar.png'

import s from './PostsLikes.module.scss'

export const PostsLikes = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()

  const { postId } = query

  const { data: post } = useGetPublicPostByIdQuery((postId as string) || '', { skip: !postId })
  const { data: comments } = useGetPublicPostCommentsByIdQuery(
    { postId: Number(postId) ?? null },
    { skip: !postId }
  )

  const avatarsWhoLikes = useMemo(() => {
    return post?.avatarWhoLikes.slice(0, 3)
  }, [post])

  const mockAvatars = [mockAvatar, mockAvatar, mockAvatar]

  console.log('post', post)
  // console.log('comment', comments)

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
        <div className={s.avatarsBox}>
          {mockAvatars?.map((avatar, index) => (
            <Image alt={`User avatar ${index + 1}`} className={s.avatar} key={index} src={avatar} />
          ))}
        </div>
        <span>
          {post?.likesCount}
          <strong> &quot;Likes&quot;</strong>
        </span>
      </div>
      <p className={s.date}>{formatDate(post?.createdAt || '', t)}</p>
    </div>
  )

  return (
    <div className={s.root}>
      {iconsBox}
      {contentBox}
    </div>
  )
}
