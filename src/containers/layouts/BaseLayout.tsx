import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './BaseLayout.module.scss'

import { Layout } from './components/layout/Layout'
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
