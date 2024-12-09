import { formatDateToTime } from '@/shared'
import { NotReadMessage, ReadMessage } from '@public/icons'
import { Typography } from '@technosamurai/techno-ui-kit'
import { clsx } from 'clsx'

import s from './DefaultMessage.module.scss'

interface IProps {
  createdAt: string
  isMine?: boolean
  isRead?: boolean
  message: string
}

export const DefaultMessage = ({ createdAt, isMine = false, isRead, message }: IProps) => {
  const arrowDecider = isRead ? (
    <ReadMessage height={16} width={16} />
  ) : (
    <NotReadMessage height={16} width={16} />
  )

  return (
    <div className={clsx(s.wrapper, isMine ? s.blueWrapper : s.greyWrapper)}>
      <Typography as={'p'} variant={'regular-text-14'}>
        {message}
      </Typography>
      <Typography
        as={'span'}
        className={clsx(s.date, isMine ? s.blueDate : s.greyDate)}
        variant={'small-text'}
      >
        {formatDateToTime(createdAt)}
        {isMine && arrowDecider}
      </Typography>
    </div>
  )
}
