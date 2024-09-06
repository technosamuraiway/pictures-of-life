import { ForgotPasswordForm } from '@/entities'
import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { Card, Typography } from '@technosamurai/techno-ui-kit'

import s from './ForgotPassword.module.scss'

export default function ForgotPassword() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.forgotPasswordPage.title} />
      <Card className={s.wrapper}>
        <Typography className={s.mainTitle} variant={'h1'}>
          {t.forgotPasswordPage.title}
        </Typography>
        <ForgotPasswordForm />
      </Card>
    </>
  )
}
