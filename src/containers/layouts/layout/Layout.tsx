import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './Layout.module.scss'

import { InitLayout } from '../components/initLayout/InitLayout'

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
