import { convertDate } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './TableCell.module.scss'

interface IProps {
  date: string
  text: string
}

export const TableCell = ({ date, text }: IProps) => {
  return (
    <div className={s.cells}>
      <Typography className={s.greyText} variant={'regular-text-14'}>
        {text}:
      </Typography>
      <Typography variant={'semi-bold-small-text'}>{convertDate(date)}</Typography>
    </div>
  )
}
