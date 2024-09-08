
import { SignInIcons, useRouterLocaleDefinition } from '@/shared'

export const OAuth = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <SignInIcons
        gitHubTitle={t.signUpPage.gitHubLinkTitle}
        googleTitle={t.signUpPage.googleLinkTitle}
        pageTitle={t.signUpPage.title}
      />
      {/* <Image alt={'Google icon'} onClick={registerWithGoogle} src={googleIcon} />
      <Image alt={'GitHub icon'} onClick={registerGitHubLogin} src={gitHubIcon} /> */}
    </>
  )
}
