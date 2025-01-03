import { MessageItem } from '@/services'
import {
  MESSAGE_STATUS,
  PATH,
  TimeAgo,
  useRouterLocaleDefinition,
  useUserIdFromParams,
} from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { NewMessageIcon } from '@public/NewMessageIcon'
import mockImage from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './DialogList.module.scss'

interface IProps {
  dialog: MessageItem
}
export const DialogList = ({ dialog }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { userId } = useUserIdFromParams()

  const { meData: meRequestData } = useMeWithRouter()

  const activeDialog = Number(userId) === dialog.ownerId || Number(userId) === dialog.receiverId

  const myMessage = dialog.ownerId === meRequestData?.userId

  const idDecider = dialog.ownerId === meRequestData?.userId ? dialog.receiverId : dialog.ownerId

  return (
    <li className={clsx(s.wrapper, activeDialog && s.active)}>
      <Link className={s.box} href={`${PATH.MESSENGER}/${idDecider}`}>
        <Image
          alt={'circle-avatar'}
          className={s.root}
          height={48}
          priority
          src={dialog.avatars[0]?.url || mockImage}
          width={48}
        />

        <div className={s.profileInfo}>
          <div className={s.usernameInfo}>
            <Typography variant={'regular-text-14'}>{dialog.userName}</Typography>
            <Typography className={s.date} variant={'small-text'}>
              {TimeAgo(dialog.createdAt || '', t)}
            </Typography>
          </div>

          <Typography className={s.text} variant={'small-text'}>
            {myMessage ? `${t.messenger.you}: ` : ''}
            {dialog.messageText}
          </Typography>
          {dialog.status === MESSAGE_STATUS.RECEIVED && (
            <NewMessageIcon className={s.newIcon} height={16} width={16} />
          )}
        </div>
      </Link>
    </li>
  )
}
