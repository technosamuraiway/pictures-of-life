import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layouts/components/layout/Layout'
import { NavBar } from '@/widgets/layouts/components/navBar/NavBar'
import { NextPage } from 'next'

import s from '@/widgets/layouts/components/layout/Layout.module.scss'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <div className={s.layoutContainer}>
        <NavBar />
        <main className={s.main}>{children}</main>
      </div>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
