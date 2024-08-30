import React, { useState } from 'react'

import { MetaHead } from '@/shared/components/MetaHead/MetaHead'
import { Trans } from '@/shared/components/Trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Button, Card, Checkbox, TextField, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './SignUp.module.scss'

import gitHubIcon from '../../../public/singUp/gitHub.svg'
import googleIcon from '../../../public/singUp/google.svg'

export default function SignUp() {
  const t = useRouterLocaleDefinition()

  const [checkBox, setCheckBox] = useState(false)

  return (
    <>
      <MetaHead title={t.signUpPage.title} />
      <Card className={s.cardContainer}>
        <div className={s.headerWrapper}>
          <Typography variant={'h1'}>{t.signUpPage.title}</Typography>
          <div className={s.linksWrapper}>
            <Link href={'https://www.google.com/'} title={t.signUpPage.googleLinkTitle}>
              <Image alt={t.signUpPage.googleLinkAlt} height={36} src={googleIcon} width={36} />
            </Link>
            <Link href={'https://github.com/'} title={t.signUpPage.gitHubLinkTitle}>
              <Image alt={t.signUpPage.gitHubLinkAlt} height={36} src={gitHubIcon} width={36} />
            </Link>
          </div>
        </div>
        <form className={s.formWrapper}>
          <TextField label={t.signUpPage.username} type={'text'} />
          <TextField label={t.signUpPage.email} type={'email'} />
          <TextField label={t.signUpPage.password} type={'password'} />
          <TextField label={t.signUpPage.passwordConfirmation} type={'password'} />
          <div className={s.checkBoxWrapper}>
            <Checkbox checked={checkBox} onCheckedChange={() => setCheckBox(!checkBox)} />
            <Typography variant={'small-text'}>
              <Trans
                tags={{
                  1: () => (
                    <Typography as={Link} href={'/'} variant={'regular-link'}>
                      {t.signUpPage.serviceLink}
                    </Typography>
                  ),
                  2: () => (
                    <Typography as={Link} href={'/'} variant={'regular-link'}>
                      {t.signUpPage.policyLink}
                    </Typography>
                  ),
                }}
                text={t.signUpPage.serviceAndPolicyAgreement}
              />
            </Typography>
          </div>
          <Button className={s.submitButton} type={'submit'}>
            {t.signUpPage.title}
          </Button>
        </form>
        <div className={s.questionWrapper}>
          <Typography variant={'regular-text-16'}>{t.signUpPage.haveAccountQuestion}</Typography>
          <Button type={'button'} variant={'textButton'}>
            {t.signInPage.title}
          </Button>
        </div>
      </Card>
    </>
  )
}
