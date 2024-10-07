import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/containers/layouts/components/layout/Layout'

import s from './BaseLayout.module.scss'

import { NextPage } from '../../../next'
import { NavBar } from './components/navBar/NavBar'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <div className={s.layoutContainer}>
        <NavBar />
        <main className={s.mainWithNav}>{children}</main>
      </div>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
