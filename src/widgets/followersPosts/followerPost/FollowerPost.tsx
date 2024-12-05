import { toast } from 'react-toastify'

import { useCreateNewCommentMutation } from '@/services/flow/commentsAnswers.service'
import { useRouterLocaleDefinition } from '@/shared'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { PostCommentFormZodSchema } from '@/widgets/profile/lib/zod/postCommentsFormZodSchema'
import { PostDescription } from '@/widgets/profile/profilePostModal/postComments/comments/postDescription/PostDescription'
import { PostCommentsAddComment } from '@/widgets/profile/profilePostModal/postComments/postCommentsAddCommenet/PostCommentsAddComment'
import testImg from '@public/error404.png'

import s from './FollowerPost.module.scss'

import { AllComments } from './allComments/AllComments'
import { FollowerPostHeader } from './followerPostHeader/FollowerPostHeader'
import { FollowerPostIcons } from './followerPostIcons/FollowerPostIcons'
import { WhoLiked } from './whoLiked/WhoLiked'

const userId = 1480
const postId = 1488
const createdAt = '2023-12-05 07:45:30'
const updatedAt = '2024-12-05 07:45:30'
const userName = 'Test'
const avatarSrc = ''
const description = 'asdasdasdasdf sdfgs s ds f'
const isLiked = true
const likesCount = 10
const images = [
  {
    createdAt: '2023-12-05 07:45:30',
    fileSize: 123,
    height: 123,
    uploadId: 'rewr',
    url: testImg.src,
    width: 1234,
  },
  {
    createdAt: '2023-12-05 07:45:30',
    fileSize: 123,
    height: 123,
    uploadId: 'reasdwr',
    url: testImg.src,
    width: 1234,
  },
]
const avatarWhoLikes = [testImg.src, testImg.src, testImg.src, testImg.src]

export const FollowerPost = () => {
  const t = useRouterLocaleDefinition()
  const [createComment] = useCreateNewCommentMutation()

  async function addCommitFormSubmit(data: PostCommentFormZodSchema) {
    try {
      await createComment({ content: data.comment, postId: Number(postId) }).unwrap()

      toast.success(t.profile.modal.serverResponses.createComment.success)
    } catch (e) {
      toast.error(t.profile.modal.serverResponses.createComment.error)
    }
  }

  return (
    <div className={s.wrapper}>
      <FollowerPostHeader
        avatarSrc={avatarSrc}
        createdAt={createdAt}
        postId={postId}
        userId={userId}
        userName={userName}
      />
      <PostsItem
        iSClick={false}
        images={images}
        imgHeight={504}
        imgWidth={490}
        postId={Number(postId)}
      />
      <FollowerPostIcons isLiked={isLiked} postId={postId} />
      <PostDescription
        avatar={avatarSrc}
        description={description}
        isWithDate={false}
        updatedAt={updatedAt}
        userName={userName}
      />
      <WhoLiked avatarWhoLikes={avatarWhoLikes} likesCount={likesCount} />
      <AllComments />
      <PostCommentsAddComment onFormSubmit={addCommitFormSubmit} />
    </div>
  )
}
