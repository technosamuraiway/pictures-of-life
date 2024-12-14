import { ReactNode } from 'react'

import { DialogsList } from '@/widgets'

import s from './MessengerLayout.module.scss'

interface IProps {
  children: ReactNode
}

const MessengerLayout = ({ children }: IProps) => {
  return (
    <div className={s.wrapper}>
      <DialogsList />
      <div className={s.children}>{children}</div>
    </div>
  )
}

export default MessengerLayout
