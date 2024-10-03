import { PropsWithChildren, ReactElement } from 'react'

import { InitLayout } from '@/containers/layouts/components/initLayout/InitLayout'
import { NextPage } from 'next'

import s from './Layout.module.scss'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <InitLayout>
      <main className={s.main}>{children}</main>
    </InitLayout>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
