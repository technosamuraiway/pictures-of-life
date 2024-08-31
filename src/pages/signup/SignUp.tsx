import { useState } from 'react'

import { MetaHead } from '@/shared/components/MetaHead/MetaHead'
import { QuestionBlock } from '@/shared/components/QuestionBlock/QuestionBlock'
import { SignInIcons } from '@/shared/components/SignInIcons/SignInIcons'
import { Trans } from '@/shared/components/Trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Button, Card, Checkbox, TextField, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './SignUp.module.scss'

export default function SignUp() {
  const t = useRouterLocaleDefinition()

  const [checkBox, setCheckBox] = useState(false)

  return (
    <>
      <MetaHead title={t.signUpPage.title} />
      <Card className={s.cardContainer}>
        <SignInIcons
          gitHubTitle={t.signUpPage.gitHubLinkTitle}
          googleTitle={t.signUpPage.googleLinkTitle}
          pageTitle={t.signUpPage.title}
        />
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
        <QuestionBlock
          buttonTitle={t.signInPage.title}
          linkHref={'/'}
          question={t.signUpPage.haveAccountQuestion}
        />
      </Card>
    </>
  )
}
