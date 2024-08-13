import LoginForm from '@/shared/components/LoginForm/LoginForm'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function SignIn() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signInPage.title} />
      <LoginForm />
    </>
  )
}
