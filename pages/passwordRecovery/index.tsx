import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export default function PasswordRecovery() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.passwordRecoveryPage.title} />
      <h1>{routerLocale.passwordRecoveryPage.title}</h1>
    </>
  )
}
