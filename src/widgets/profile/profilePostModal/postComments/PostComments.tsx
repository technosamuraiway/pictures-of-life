import { memo } from 'react'

import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import clsx from 'clsx'

import s from './PostComments.module.scss'

import { PostCommentFormZodSchema } from '../../lib/zod/postCommentsFormZodSchema'
import { Comments } from './comments/Comments'
import { PostCommentsAddComment } from './postCommentsAddCommenet/PostCommentsAddComment'
import { PostCommentsHeader } from './postCommentsHeader/PostCommentsHeader'
import { PostsLikes } from './postLikes/PostsLikes'

interface iProps {
  className?: string
  onCommentChange: (hasComment: boolean) => void
}

export const PostComments = memo(({ className, onCommentChange }: iProps) => {
  const { isOwnProfile, meData, router } = useMeWithRouter()

  const { userId } = router.query

  const isAuthorized = !!meData

  const { data: profileData } = useGetPublicUserProfileByIdQuery(userId as string)

  async function addCommitFormSubmit(data: PostCommentFormZodSchema) {
    return new Promise(res => {
      setTimeout(() => res(100), 5000)
    })
  }

  return (
    <div className={clsx(s.root, className)}>
      <PostCommentsHeader
        avatar={profileData?.avatars[0]?.url || ''}
        isAuthorized={isAuthorized}
        isOwnProfile={isOwnProfile}
        userName={profileData?.userName || 'no info'}
      />

      <Comments />

      <PostsLikes />

      {isAuthorized && (
        <PostCommentsAddComment
          onCommentChange={onCommentChange}
          onFormSubmit={addCommitFormSubmit}
        />
      )}
    </div>
  )
})
