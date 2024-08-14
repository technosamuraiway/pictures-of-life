import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

export default function CreateNewPassword() {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <>
      <HeadMeta title={routerLocale.createNewPasswordPage.title} />
      <h1>{routerLocale.createNewPasswordPage.title}</h1>
    </>
  )
}
