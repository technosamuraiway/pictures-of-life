import { ComponentPropsWithoutRef } from 'react'

import { IconLink, PATH, useRouterLocaleDefinition } from '@/shared'
import gitHubIcon from '@public/singIn/gitHub.svg'
import googleIcon from '@public/singIn/google.svg'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './SignInIcons.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  gitHubTitle: string
  googleTitle: string
  pageTitle: string
}

const registerWithGoogle = (): void => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE
  const REDIRECT_URL = 'http://localhost:3000'
  const scope = 'email profile' //data which we need in request
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`

  window.location.assign(url)
}

const registerGitHubLogin = () => {
  window.location.assign(PATH.AUTH.URLGITHUBLOGIN)
}

export const SignInIcons = ({
  className,
  gitHubTitle,
  googleTitle,
  pageTitle,
  ...rest
}: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={clsx(s.wrapper, className)} {...rest}>
      <Typography variant={'h1'}>{pageTitle}</Typography>
      <div className={s.linksWrapper}>
        <IconLink
          altText={t.signUpPage.googleLinkAlt}
          className={s.linkIcon}
          dimensions={36}
          imgSrc={googleIcon}
          linkTitle={googleTitle}
          onClick={registerWithGoogle}
        />
        <IconLink
          altText={t.signUpPage.gitHubLinkAlt}
          className={s.linkIcon}
          dimensions={36}
          imgSrc={gitHubIcon}
          linkTitle={gitHubTitle}
          onClick={registerGitHubLogin}
        />
      </div>
    </div>
  )
}
