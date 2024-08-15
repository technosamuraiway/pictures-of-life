import { RegistrationForm } from '../../components/SignUpForm'
import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export default function SignUp() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signUpPage.title} />
      <RegistrationForm />
    </>
  )
}
