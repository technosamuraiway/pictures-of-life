import { ReactNode } from 'react'

import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './TableCell.module.scss'

interface IProps {
  icon?: ReactNode
  value: string
}

export const TableCell = ({ icon, value }: IProps) => {
  return (
    <Tables.TableBodyCell>
      {icon ? (
        <div className={s.iconWrapper}>
          {icon}
          <Typography variant={'regular-text-14'}>{value}</Typography>
        </div>
      ) : (
        <div className={clsx(s.wrapper, { [s.text]: icon })}>
          <Typography variant={'regular-text-14'}>{value}</Typography>
        </div>
      )}
    </Tables.TableBodyCell>
  )
}
