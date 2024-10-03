import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from '../layout/Layout.module.scss'

import { InitLayout } from '../components/initLayout/InitLayout'
import { NavBar } from '../components/navBar/NavBar'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <InitLayout>
      <div className={s.layoutContainer}>
        <NavBar />
        <main className={s.mainWithNav}>{children}</main>
      </div>
    </InitLayout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
