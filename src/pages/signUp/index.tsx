import { RegistrationForm } from '@/shared/components/SignUpForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function SignUp() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signUpPage.title} />
      <RegistrationForm />
    </>
  )
}
