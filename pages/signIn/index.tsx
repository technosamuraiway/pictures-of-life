import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { getLayout } from '../../components/layout/Layout'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

const SignIn = () => {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signInPage.title} />
      <h2>Hello, i am SignIn page</h2>
    </>
  )
}

SignIn.getLayout = getLayout
export default SignIn
