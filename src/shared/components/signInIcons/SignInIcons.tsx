import { ComponentPropsWithoutRef } from 'react'

import { IconLink, useRouterLocaleDefinition } from '@/shared'
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
          linkHref={'https://www.google.com/'}
          linkTitle={googleTitle}
        />
        <IconLink
          altText={t.signUpPage.gitHubLinkAlt}
          className={s.linkIcon}
          dimensions={36}
          imgSrc={gitHubIcon}
          linkHref={'https://github.com/'}
          linkTitle={gitHubTitle}
        />
      </div>
    </div>
  )
}
