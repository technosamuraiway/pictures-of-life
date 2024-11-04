import { Typography } from '@technosamurai/techno-ui-kit'

import s from './HeadCell.module.scss'

interface IProps {
  title: string
}

export const HeadCell = ({ title }: IProps) => {
  return (
    <Tables.TableHeadCell>
      <div className={s.wrapper}>
        <Typography variant={'medium-text-14'}>{title}</Typography>
      </div>
    </Tables.TableHeadCell>
  )
}
