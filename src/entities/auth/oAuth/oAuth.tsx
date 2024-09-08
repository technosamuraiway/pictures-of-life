import { SignInIcons, useRouterLocaleDefinition } from '@/shared'

export function OAuth() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <SignInIcons
        gitHubTitle={t.signUpPage.gitHubLinkTitle}
        googleTitle={t.signUpPage.googleLinkTitle}
        pageTitle={t.signUpPage.title}
      />
    </>
  )
}
