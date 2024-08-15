import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { getLayout } from '../../components/layout/Layout'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

const SignUp = () => {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.signUpPage.title} />
      <h2>Hello, i am SignUp page</h2>
    </>
  )
}

SignUp.getLayout = getLayout
export default SignUp
