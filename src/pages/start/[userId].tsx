import { AvatarsType, IPostPublicResponse } from '@/services'
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
  posts: IPostPublicResponse
  user: IResponse
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) => {
  const { userId } = query

  const [userResponse, postsResponse] = await Promise.all<Response>([
    fetch(`https://inctagram.work/api/v1/public-user/profile/${userId}`),
    fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`),
  ])

  const posts: IPostPublicResponse = await postsResponse.json()
  const user: IResponse = await userResponse.json()

  return { props: { posts, user } }
}

const StartSSR = ({ posts, user }: IProps) => {
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
      <div className={s.wrapperPosts}>
        <Typography className={s.text} variant={'regular-text-14'}>
          Все мои посты : {posts.items.length}{' '}
        </Typography>
        {posts?.items.map((el, i) => {
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
