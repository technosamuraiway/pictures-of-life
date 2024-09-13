import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Layout } from './layout/Layout'

const LayoutWithNav: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <nav>Navigation</nav>
      <main>{children}</main>
    </Layout>
  )
}

export function getLayoutWithNav(page: ReactElement) {
  return <LayoutWithNav>{page}</LayoutWithNav>
}
