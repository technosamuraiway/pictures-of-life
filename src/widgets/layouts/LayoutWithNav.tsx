import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layouts/layout/Layout'
import { NavBar } from '@/widgets/navBar/NavBar'
import { NextPage } from 'next'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <NavBar />
      <main>{children}</main>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
