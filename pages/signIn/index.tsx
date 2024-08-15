import LoginForm from '../../components/LoginForm/LoginForm'
import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export default function SignIn() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signInPage.title} />
      <LoginForm />
    </>
  )
}
