import ForgotPasswordForm from '@/shared/components/ForgotPassword/ForgotPasswordForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function ForgotPassword() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.forgotPasswordPage.title} />
      <ForgotPasswordForm />
    </>
  )
}
