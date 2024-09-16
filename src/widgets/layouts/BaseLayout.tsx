import { PropsWithChildren, ReactElement } from 'react'

import { PATH } from '@/shared'
import { Layout } from '@/widgets/layouts/layout/Layout'
import { NextPage } from 'next'
import Link from 'next/link'

import s from './layout/Layout.module.scss'
const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <main className={s.main}>
        {/* Link - временные ссылки, чтобы показать работу NextTopLoader */}
        <div className={s.links}>
          <Link href={PATH.HOME}>Home</Link>
          <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
          <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
          <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
          <Link href={'/avatar/avatartest'}>Avatar Page</Link>
        </div>
        {children}
      </main>
    </Layout>
  )
}

export function getBaseLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
