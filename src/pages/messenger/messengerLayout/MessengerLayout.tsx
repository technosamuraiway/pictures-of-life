import { ReactNode } from 'react'

import { IDialogList } from '@/shared'
import { DialogsList } from '@/widgets'
import testImg from '@public/error404.png'

import s from './MessengerLayout.module.scss'

interface IProps {
  children: ReactNode
}

const MessengerLayout = ({ children }: IProps) => {
  const dialogs: IDialogList[] = [
    {
      createdAt: '2023-10-31T12:09:09.176Z',
      id: 16768,
      lastMessage: 'dsfgfdg asfdsf v vsdrevdsvxdfgdgvbnhg',
      name: 'User 1',
      ownerId: 1478,
      receiverId: 1480,
      src: testImg.src,
    },
    {
      createdAt: '2023-10-31T12:09:09.176Z',
      id: 25654,
      lastMessage: 'dsfgfdg asfdsf v vsdrevdsvxdfgdgvbnhg',
      name: 'User 2',
      ownerId: 1480,
      receiverId: 1490,
      src: testImg.src,
    },
    {
      createdAt: '2024-12-08T12:09:09.176Z',
      id: 2354,
      lastMessage: 'dsfgfdg asfdsf v vsdrevdsvxdfgdgvbnhg',
      name: 'User 3',
      ownerId: 1575,
      receiverId: 1480,
      src: testImg.src,
    },
  ]

  return (
    <div className={s.wrapper}>
      <DialogsList dialogs={dialogs} />
      <div className={s.children}>{children}</div>
    </div>
  )
}

export default MessengerLayout
