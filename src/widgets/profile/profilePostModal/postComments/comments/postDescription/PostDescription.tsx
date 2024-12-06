import { memo } from 'react'

import { CircleAvatar, PATH, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './PostDescription.module.scss'

interface IProps {
  avatar: string
  description: string
  isWithDate?: boolean
  updatedAt: string
  userId?: number
  userName: string
}

export const PostDescription = memo(
  ({ avatar, description, isWithDate = true, updatedAt, userId, userName }: IProps) => {
    const t = useRouterLocaleDefinition()

    return (
      <div className={s.root}>
        <CircleAvatar href={`${PATH.PROFILE.BASEPROFILE}/${userId}`} src={avatar} />

        <div className={s.content}>
          <div className={s.text}>
            <Typography
              as={Link}
              className={s.username}
              href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}
              variant={'bold-text-14'}
            >
              {userName}
            </Typography>{' '}
            <Typography className={s.description} variant={'medium-text-14'}>
              {description}
            </Typography>
          </div>
          {isWithDate && (
            <Typography className={s.date} variant={'small-text'}>
              {TimeAgo(updatedAt, t)}
            </Typography>
          )}
        </div>
      </div>
    )
  }
)
