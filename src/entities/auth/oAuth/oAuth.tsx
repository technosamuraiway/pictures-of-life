import { SignInIcons, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  title?: string
}

export function OAuth({ title }: IProps) {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <SignInIcons
        gitHubTitle={t.signUpPage.gitHubLinkTitle}
        googleTitle={t.signUpPage.googleLinkTitle}
        pageTitle={title || t.signUpPage.title}
      />
    </>
  )
}
