import { PropsWithChildren, ReactElement } from 'react'

import { PATH } from '@/shared'
import { NextPage } from 'next'
import Link from 'next/link'

import s from '../layouts/layout/Layout.module.scss'

import { NavBar } from '../navBar/NavBar'
import { Layout } from './layout/Layout'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <div className={s.layoutContainer}>
        <NavBar />
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
      </div>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
