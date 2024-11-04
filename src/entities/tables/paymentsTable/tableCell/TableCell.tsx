import { ProductDropDown } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './TableCell.module.scss'

interface IProps {
  value: string
}

export const TableCell = ({ value }: IProps) => {
  return (
    <Tables.TableBodyCell>
      <div className={s.wrapper}>
        <Typography variant={'regular-text-14'}>{value}</Typography>
      </div>
    </Tables.TableBodyCell>
  )
}
