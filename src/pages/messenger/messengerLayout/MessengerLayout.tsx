import { ReactNode } from 'react'

import { IDialogList } from '@/shared'
import { DialogsList } from '@/widgets'

import s from './MessengerLayout.module.scss'

interface IProps {
  children: ReactNode
}

const MessengerLayout = ({ children }: IProps) => {
  const dialogs: IDialogList[] = [
    { id: '16768', name: 'User 1' },
    { id: '25654', name: 'User 2' },
    { id: '2354', name: 'User 3' },
  ]

  return (
    <div className={s.wrapper}>
      <DialogsList dialogs={dialogs} />
      <div>{children}</div>
    </div>
  )
}

export default MessengerLayout
