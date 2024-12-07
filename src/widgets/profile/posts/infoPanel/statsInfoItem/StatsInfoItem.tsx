import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './StatsInfoItem.module.scss'

interface iProps {
  isHover?: boolean
  num: number
  onClick?: () => void
  title: string
}

export const StatsInfoItem = ({ isHover = false, num, onClick, title }: iProps) => {
  return (
    <div className={clsx(isHover && s.hover)} onClick={onClick}>
      <Typography variant={'bold-text-14'}>{num}</Typography>
      <Typography variant={'bold-text-14'}>{title}</Typography>
    </div>
  )
}
