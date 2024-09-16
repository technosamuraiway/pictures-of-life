import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from '../layouts/layout/Layout.module.scss'

import { NavBar } from '../navBar/NavBar'
import { Layout } from './layout/Layout'

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
