import { AvatarsType, IPostPublicResponse, IPostUser } from '@/services'
import { getBaseLayout } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

import s from './StartSSR.module.scss'

interface IResponse {
  aboutMe: string
  avatars: AvatarsType[]
  id: number
  userName: string
}

interface IProps {
  post: IPostUser
  posts: IPostPublicResponse
  user: IResponse
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
  const { postId, userId } = query

  const [userResponse, postsResponse, postResponse] = await Promise.all<Response>([
    fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`),
    fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`),
    fetch(`https://inctagram.work/api/v1/public-posts/${postId}`),
  ])

  const post: IPostUser = await postResponse.json()
  const posts: IPostPublicResponse = await postsResponse.json()
  const user: IResponse = await userResponse.json()

  return { props: { post, posts, user } }
}

const StartSSR = ({ post, posts, user }: IProps) => {
  return (
    <div>
      <div className={s.wrapperUser}>
        <Image
          alt={`${user?.userName} - avatar`}
          height={200}
          src={user.avatars[0].url}
          width={200}
        />
        <Typography variant={'bold-text-16'}>{user?.userName}:</Typography>
        <Typography variant={'bold-text-14'}>{user?.aboutMe}</Typography>
      </div>

      <div className={s.wrapperUser}>
        <Image alt={`${post?.userName} - avatar`} height={200} src={post.avatarOwner} width={200} />
        <Typography variant={'bold-text-16'}>{post?.userName}:</Typography>
        <Typography variant={'bold-text-14'}>{post?.description}</Typography>
      </div>

      <div className={s.wrapperPosts}>
        <Typography className={s.text} variant={'regular-text-14'}>
          Все мои посты : {posts.items.length}{' '}
        </Typography>
        {posts?.items.map(el => {
          return (
            <Image
              alt={'posts image'}
              height={200}
              key={el.id}
              src={el.images[0].url}
              width={200}
            />
          )
        })}
      </div>
    </div>
  )
}

StartSSR.getLayout = getBaseLayout
export default StartSSR
