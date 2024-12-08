import { IDialogList, PATH } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './DialogList.module.scss'

interface IProps {
  dialog: IDialogList
}
export const DialogList = ({ dialog }: IProps) => {
  const { query } = useRouter()
  const { userId } = query

  const activeDialog = userId === dialog.id

  return (
    <li className={clsx(s.wrapper, activeDialog && s.active)}>
      <Link href={`${PATH.MESSENGER}/${dialog.id}`}>
        <Typography variant={'bold-text-14'}>{dialog.name}</Typography>
      </Link>
    </li>
  )
}
