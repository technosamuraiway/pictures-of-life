import { HeadMeta } from '../../components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export default function CreateNewPassword() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.createNewPasswordPage.title} />
      <h1>{routerLocale.createNewPasswordPage.title}</h1>
    </>
  )
}
