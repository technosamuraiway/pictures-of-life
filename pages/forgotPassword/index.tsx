import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm'
import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export default function ForgotPassword() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.forgotPasswordPage.title} />
      <ForgotPasswordForm />
    </>
  )
}
