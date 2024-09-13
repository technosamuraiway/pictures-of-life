import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Layout } from './layout/Layout'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <main>{children}</main>
    </Layout>
  )
}

export function getBaseLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
