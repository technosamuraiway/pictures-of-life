import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import testImg from '@public/error404.png'

import s from './FollowerPost.module.scss'

import { FollowerPostHeader } from './followerPostHeader/FollowerPostHeader'
import { FollowerPostIcons } from './followerPostIcons/FollowerPostIcons'

const userId = 1480
const postId = 1488
const createdAt = '2023-12-05 07:45:30'
const userName = 'Test'
const avatarSrc = ''
const isLiked = true

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

export const FollowerPost = () => {
  return (
    <div className={s.wrapper}>
      <FollowerPostHeader
        avatarSrc={avatarSrc}
        createdAt={createdAt}
        userId={userId}
        userName={userName}
      />
      <PostsItem images={images} imgHeight={504} imgWidth={490} postId={Number(postId)} />
      <FollowerPostIcons isLiked={isLiked} postId={postId} />
    </div>
  )
}
