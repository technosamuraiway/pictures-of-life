import { ComponentPropsWithoutRef } from 'react'

import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import gitHubIcon from '@public/singIn/gitHub.svg'
import googleIcon from '@public/singIn/google.svg'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './SignInIcons.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  gitHubTitle: string
  googleTitle: string
  pageTitle: string
}

export const SignInIcons = (props: IProps) => {
  const { className, gitHubTitle, googleTitle, pageTitle, ...rest } = props

  const t = useRouterLocaleDefinition()

  return (
    <div className={clsx(s.wrapper, className)} {...rest}>
      <Typography variant={'h1'}>{pageTitle}</Typography>
      <div className={s.linksWrapper}>
        <Link href={'https://www.google.com/'} title={googleTitle}>
          <Image alt={t.signUpPage.googleLinkAlt} height={36} src={googleIcon} width={36} />
        </Link>
        <Link href={'https://github.com/'} title={gitHubTitle}>
          <Image alt={t.signUpPage.gitHubLinkAlt} height={36} src={gitHubIcon} width={36} />
        </Link>
      </div>
    </div>
  )
}
