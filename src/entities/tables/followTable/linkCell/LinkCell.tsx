import { useImagesStore } from '@/shared'
import { Tables, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './LinkCell.module.scss'

interface IProps {
  href: string
  value: string
}

export const LinkCell = ({ href, value }: IProps) => {
  const { resetStore } = useImagesStore()

  return (
    <Tables.TableBodyCell>
      <div className={s.wrapper} onClick={resetStore}>
        <Typography as={Link} className={s.text} href={href} variant={'regular-text-14'}>
          {value}
        </Typography>
      </div>
    </Tables.TableBodyCell>
  )
}
