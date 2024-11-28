import { useMemo } from 'react'

import { useUpdatePostLikeStatusMutation } from '@/services'
import { useGetPublicPostByIdQuery } from '@/services/flow/publicPosts.service'
import { RequestLineLoader, Skeleton, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { formatDate } from '@/shared/utils/dateFormatter'
import { BookmarkIcon, FilledLikeIcon, LikeIcon, MessageIcon } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import s from './PostsLikes.module.scss'

export const PostsLikes = () => {
  const t = useRouterLocaleDefinition()
  const { meData, router } = useMeWithRouter()
  const { query } = router

  const { postId } = query

  const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery(
    (postId as string) || '',
    {
      skip: !postId,
    }
  )
  const [putLike, { isLoading: isPutLikeLoading }] = useUpdatePostLikeStatusMutation()

  function likeHandler() {
    if (!postId) {
      return
    }
    putLike({ likeStatus: 'LIKE', postId: Number(postId) })
  }

  function unLikeHandler() {
    if (!postId) {
      return
    }
    putLike({ likeStatus: 'NONE', postId: Number(postId) })
  }

  const avatarsWhoLikes = useMemo(() => {
    return post?.avatarWhoLikes.slice(0, 3)
  }, [post])

  const avatars = !!avatarsWhoLikes?.length && (
    <div className={s.avatarsBox}>
      {avatarsWhoLikes?.map((avatar, index) => (
        <Image
          alt={`User avatar ${index + 1}`}
          className={s.avatar}
          height={24}
          key={index}
          src={avatar}
          width={24}
        />
      ))}
    </div>
  )

  const iconsBox = (
    <div className={s.iconsBox}>
      {post?.isLiked ? (
        <FilledLikeIcon
          className={clsx(s.likeIcon, s.likeIconFilled)}
          height={24}
          onClick={unLikeHandler}
          width={24}
        />
      ) : (
        <LikeIcon className={s.likeIcon} onClick={likeHandler} />
      )}

      <MessageIcon />
      <BookmarkIcon />
    </div>
  )

  const contentBox = (
    <div className={s.contentBox}>
      <div className={s.likes}>
        {isPostLoading ? <Skeleton height={20} width={60} /> : avatars}

        {isPostLoading ? (
          <Skeleton height={20} width={60} />
        ) : (
          <span>
            {post?.likesCount}
            <strong> &quot;Likes&quot;</strong>
          </span>
        )}
      </div>

      {isPostLoading ? (
        <Skeleton height={10} width={60} />
      ) : (
        <Typography className={s.date} variant={'small-text'}>
          {formatDate(post?.createdAt || '', t)}
        </Typography>
      )}
    </div>
  )

  return (
    <>
      {isPutLikeLoading && <RequestLineLoader />}
      <div className={s.root}>
        {!!meData && iconsBox}
        {contentBox}
      </div>
    </>
  )
}
