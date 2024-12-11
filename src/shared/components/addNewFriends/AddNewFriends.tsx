import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './AddNewFriends.module.scss'

interface IProps {
  isWithButton?: boolean
  title: string
}

export const AddNewFriends = ({ isWithButton = true, title }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.wrapper}>
      <Typography as={'h2'} variant={'h2'}>
        {title}
      </Typography>
      {isWithButton && (
        <Button as={Link} href={PATH.SEARCH} variant={'primary'}>
          {t.profile.info.stats.findNew}
        </Button>
      )}
    </div>
  )
}
