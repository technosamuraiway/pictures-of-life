import { PropsWithChildren, ReactElement } from 'react'

import { useSocket } from '@/services/websocket/useSocket'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { NextPage } from 'next'

import s from './BaseLayout.module.scss'

import { Layout } from './components/layout/Layout'
import { NavBar } from './components/navBar/NavBar'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  const { meData } = useMeWithRouter()

  useSocket(!!meData)

  return (
    <Layout>
      {!!meData && <NavBar />}
      <main className={s.mainWithNav}>{children}</main>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
