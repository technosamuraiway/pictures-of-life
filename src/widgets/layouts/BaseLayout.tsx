import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layouts/components/layout/Layout'
import { NextPage } from 'next'

import s from './BaseLayout.module.scss'
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
