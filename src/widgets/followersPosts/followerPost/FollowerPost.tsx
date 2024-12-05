import { toast } from 'react-toastify'

import { HomePost } from '@/services'
import { useCreateNewCommentMutation } from '@/services/flow/commentsAnswers.service'
import { useRouterLocaleDefinition } from '@/shared'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { PostCommentFormZodSchema } from '@/widgets/profile/lib/zod/postCommentsFormZodSchema'
import { PostDescription } from '@/widgets/profile/profilePostModal/postComments/comments/postDescription/PostDescription'
import { PostCommentsAddComment } from '@/widgets/profile/profilePostModal/postComments/postCommentsAddCommenet/PostCommentsAddComment'

import s from './FollowerPost.module.scss'

import { AllComments } from './allComments/AllComments'
import { FollowerPostHeader } from './followerPostHeader/FollowerPostHeader'
import { FollowerPostIcons } from './followerPostIcons/FollowerPostIcons'
import { WhoLiked } from './whoLiked/WhoLiked'

interface IProps {
  post: HomePost
}

export const FollowerPost = ({ post }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [createComment] = useCreateNewCommentMutation()

  async function addCommitFormSubmit(data: PostCommentFormZodSchema) {
    try {
      await createComment({ content: data.comment, postId: Number(post.id) }).unwrap()

      toast.success(t.profile.modal.serverResponses.createComment.success)
    } catch (e) {
      toast.error(t.profile.modal.serverResponses.createComment.error)
    }
  }

  return (
    <div className={s.wrapper}>
      <FollowerPostHeader
        avatarSrc={post.avatarOwner}
        createdAt={post.createdAt}
        postId={post.id}
        userId={post.ownerId}
        userName={post.userName}
      />
      <PostsItem
        iSClick={false}
        images={post.images}
        imgHeight={504}
        imgWidth={490}
        postId={Number(post.id)}
      />
      <FollowerPostIcons isLiked={post.isLiked} postId={post.id} />
      <PostDescription
        avatar={post.avatarOwner}
        description={post.description}
        isWithDate={false}
        updatedAt={post.updatedAt}
        userName={post.userName}
      />
      <WhoLiked avatarWhoLikes={post.avatarWhoLikes} likesCount={post.likesCount} />
      <AllComments />
      <PostCommentsAddComment onFormSubmit={addCommitFormSubmit} />
    </div>
  )
}
