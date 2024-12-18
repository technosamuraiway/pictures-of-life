import mockImage from '@public/mockAvatar.png'
import Image from 'next/image'

import s from './FriendMessage.module.scss'

import { DefaultMessage } from '../defaultMessage/DefaultMessage'

interface IProps {
  avatar?: string
  createdAt: string
  message: string
}

export const FriendMessage = ({ avatar, createdAt, message }: IProps) => {
  return (
    <div className={s.wrapper}>
      <Image
        alt={'User avatar'}
        className={s.avatar}
        height={36}
        src={avatar || mockImage}
        width={36}
      />
      <DefaultMessage createdAt={createdAt} message={message} />
    </div>
  )
}
