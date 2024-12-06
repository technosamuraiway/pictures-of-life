import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { useCreateNewCommentMutation } from '@/services/flow/commentsAnswers.service'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { HomePostLikes } from '@/widgets/followersPosts/followerPost/homePostLikes/HomePostLikes'
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
  const t = useRouterLocaleDefinition()
  const [openFollowingModal, setOpenFollowingModal] = useState(false)
  const { isOwnProfile, meData, router } = useMeWithRouter()

  const { postId, userId } = router.query

  const isAuthorized = !!meData

  const { data: profileData } = useGetPublicUserProfileByIdQuery(userId as string)
  const [createComment, { isLoading: isCreatingComment }] = useCreateNewCommentMutation()

  async function addCommitFormSubmit(data: PostCommentFormZodSchema) {
    try {
      await createComment({ content: data.comment, postId: Number(postId) }).unwrap()
      toast.success(t.profile.modal.serverResponses.createComment.success)
    } catch (e) {
      toast.error(t.profile.modal.serverResponses.createComment.error)
    }
  }

  return (
    <>
      <div className={clsx(s.root, className)}>
        {isCreatingComment && <RequestLineLoader />}
        <PostCommentsHeader
          avatar={profileData?.avatars[0]?.url || ''}
          isAuthorized={isAuthorized}
          isOwnProfile={isOwnProfile}
          userName={profileData?.userName || ''}
        />

        <Comments />

        <PostsLikes setOpenModal={setOpenFollowingModal} />

        {isAuthorized && (
          <PostCommentsAddComment
            onCommentChange={onCommentChange}
            onFormSubmit={addCommitFormSubmit}
          />
        )}
      </div>
      <HomePostLikes
        openModal={openFollowingModal}
        postId={Number(postId)}
        setOpenModal={setOpenFollowingModal}
      />
    </>
  )
})
