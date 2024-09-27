import { ReactNode } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Card, Typography } from '@technosamurai/techno-ui-kit'

import s from '../Devices.module.scss'

interface IProps {
  children?: ReactNode[]
  currentIcon?: ReactNode
  date?: string
  ip?: string
  tittle?: string
}

export const SessionCard = ({ children, currentIcon, date, ip, tittle }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <Card className={s.card}>
      <div className={s.cardInWrapper}>
        <div className={s.icon}>{currentIcon}</div>
        <div className={s.cardDescription}>
          <Typography variant={'bold-text-16'}>{tittle}</Typography>
          <Typography variant={'regular-text-14'}>IP: {ip}</Typography>
          {date ? (
            <Typography variant={'small-text'}>
              {`${t.settingsPage.devices.lastVisit}: ${date}`}
            </Typography>
          ) : null}
        </div>
      </div>
      {children}
    </Card>
  )
}
