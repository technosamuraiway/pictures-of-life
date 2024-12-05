import { PATH, useRouterLocaleDefinition } from '@/shared'
import { ArrowLeft } from '@public/ArrowLeft'
import { Button } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './BackToUsersList.module.scss'

export const BackToUsersList = () => {
  const t = useRouterLocaleDefinition()

  return (
    <Button as={Link} className={s.backTo} href={PATH.ADMIN.USERSLIST} variant={'textButton'}>
      <ArrowLeft className={s.arrowBack} />
      {t.admin.userList.backToUsersList}
    </Button>
  )
}
