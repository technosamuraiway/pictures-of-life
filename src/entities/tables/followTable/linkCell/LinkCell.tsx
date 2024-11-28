import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './LinkCell.module.scss'

interface IProps {
  href: string
  value: string
}

export const LinkCell = ({ href, value }: IProps) => {
  return (
    <Tables.TableBodyCell>
      <div className={s.wrapper}>
        <Typography as={Link} className={s.text} href={href} variant={'regular-text-14'}>
          {value}
        </Typography>
      </div>
    </Tables.TableBodyCell>
  )
}
