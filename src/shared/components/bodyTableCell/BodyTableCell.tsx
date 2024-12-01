import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './BodyTableCell.module.scss'

interface IProps {
  className?: string
  value: string
  valueCN?: string
}

export const BodyTableCell = ({ className, value, valueCN }: IProps) => {
  return (
    <Tables.TableBodyCell>
      <div className={clsx(s.wrapper, className)}>
        <Typography className={valueCN} variant={'regular-text-14'}>
          {value}
        </Typography>
      </div>
    </Tables.TableBodyCell>
  )
}
