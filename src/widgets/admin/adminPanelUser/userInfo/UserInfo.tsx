import { Typography } from '@technosamurai/techno-ui-kit'

import s from './UserInfo.module.scss'

interface IProps {
  header: string
  info: string
}

export const UserInfo = ({ header, info }: IProps) => {
  return (
    <div className={s.wrapper}>
      <Typography as={'h4'} className={s.grey} variant={'regular-text-14'}>
        {header}
      </Typography>
      <Typography variant={'regular-text-16'}>{info}</Typography>
    </div>
  )
}
