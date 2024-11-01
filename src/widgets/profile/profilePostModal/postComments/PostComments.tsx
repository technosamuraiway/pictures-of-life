import { memo } from 'react'

import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { PostCommentFormZodSchema } from '@/widgets/profile/lib/zod/postCommentsFormZodSchema'
import clsx from 'clsx'

import s from './PostComments.module.scss'

import { PostCommentsAddComment } from './postCommentsAddCommenet/PostCommentsAddComment'
import { PostCommentsHeader } from './postCommentsHeader/PostCommentsHeader'

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
    setTimeout(() => {
      return Promise.resolve()
    }, 5000)
  }

  return (
    <div className={clsx(s.root, className)}>
      <PostCommentsHeader
        avatar={profileData?.avatars[0]?.url || ''}
        isOwnProfile={isOwnProfile}
        userName={profileData?.userName || 'no info'}
      />

      {isAuthorized && (
        <PostCommentsAddComment
          onCommentChange={onCommentChange}
          onFormSubmit={addCommitFormSubmit}
        />
      )}
    </div>
  )
})
