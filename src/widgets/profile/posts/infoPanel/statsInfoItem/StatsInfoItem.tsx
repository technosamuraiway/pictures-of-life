import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './StatsInfoItem.module.scss'

interface iProps {
  num: number
  onClick?: () => void
  title: string
}

export const StatsInfoItem = ({ num, onClick, title }: iProps) => {
  return (
    <div className={clsx(onClick && s.hover)} onClick={onClick}>
      <Typography variant={'bold-text-14'}>{num}</Typography>
      <Typography variant={'bold-text-14'}>{title}</Typography>
    </div>
  )
}
