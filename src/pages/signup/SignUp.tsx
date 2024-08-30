import React from 'react'

import { MetaHead } from '@/shared/components/MetaHead/MetaHead'
import { Trans } from '@/shared/components/Trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import Link from 'next/link'

import s from './SignUp.module.scss'

export default function SignUp() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.signUpPage.title} />
      <div>SignUP page</div>
      <p>
        <Trans
          tags={{
            1: () => (
              <Link href={'/'} style={{ color: 'red' }}>
                {t.termsOfService.title}
              </Link>
            ),
            2: () => (
              <Link href={'/'} style={{ color: 'green' }}>
                {t.privacyPolicy.title}
              </Link>
            ),
          }}
          text={t.signUpPage.serviceAndPolicyAgreement}
        />
      </p>
    </>
  )
}
