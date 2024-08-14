import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function PasswordRecovery() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.passwordRecoveryPage.title} />
      <h1>{routerLocale.passwordRecoveryPage.title}</h1>
    </>
  )
}
