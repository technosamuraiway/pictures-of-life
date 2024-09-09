// import LoginForm from '@/shared/components/LoginForm/LoginForm'
// import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
// import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

import { SignInForm, SignInFormValues } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'

export default function SignIn() {
  // const routerLocale = useRouterLocaleDefinition()
  const t = useRouterLocaleDefinition()

  return (
    <>
      <SignInForm buttonDisabled={false} />
    </>
  )
}
