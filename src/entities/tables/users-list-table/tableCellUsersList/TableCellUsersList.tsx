import { ReactNode } from 'react'

import { Tables, Typography } from '@technosamurai/techno-ui-kit'

import s from './TableCellUsersList.module.scss'

interface IProps {
  icon?: ReactNode
  value: number
}

export const TableCellUsersList = ({ icon, value }: IProps) => {
  return (
    <Tables.TableBodyCell>
      {icon ? (
        <div className={s.iconWrapper}>
          {icon}
          <Typography className={s.text} variant={'regular-text-14'}>
            {value}
          </Typography>
        </div>
      ) : (
        <div className={s.wrapper}>
          <Typography variant={'regular-text-14'}>{value}</Typography>
        </div>
      )}
    </Tables.TableBodyCell>
  )
}
