import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layouts/layout/Layout'
import { NextPage } from 'next'

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
