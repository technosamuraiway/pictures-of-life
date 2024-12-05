import { useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './WhoLiked.module.scss'

interface IProps {
  avatarWhoLikes?: string[]
  likesCount?: number
}

export const WhoLiked = ({ avatarWhoLikes, likesCount }: IProps) => {
  const t = useRouterLocaleDefinition()

  const avatars = avatarWhoLikes?.slice(0, 3)

  return (
    <div className={s.wrapper}>
      {!!avatars?.length && (
        <div className={s.avatarsBox}>
          {avatars?.map((avatar, index) => (
            <Image
              alt={`User avatar ${index + 1}`}
              className={s.avatar}
              height={24}
              key={index}
              priority
              src={avatar}
              width={24}
            />
          ))}
        </div>
      )}
      <Typography as={'span'} className={s.text} variant={'regular-text-14'}>
        {likesCount}{' '}
        <Typography as={'span'} variant={'bold-text-14'}>
          {`"${t.posts.likes}"`}
        </Typography>
      </Typography>
    </div>
  )
}
