import React, { ReactNode } from 'react'

import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import Link from 'next/link'

import s from '@/shared/components/Layout/Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className={s.layout}>
      <Header />
      {/* Link - временные ссылки, чтобы показать работу NextTopLoader */}
      <Link href={'/'}>Home</Link>
      <Link href={'/signin'}>Sign-in</Link>
      <main>{children}</main>
    </div>
  )
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}
export default Layout
