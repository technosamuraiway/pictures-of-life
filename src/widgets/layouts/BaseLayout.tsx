import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layouts/layout/Layout'
import { NextPage } from 'next'

import s from './layout/Layout.module.scss'
const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <main className={s.main}>{children}</main>
    </Layout>
  )
}

export function getBaseLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
