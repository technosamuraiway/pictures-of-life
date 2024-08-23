import React, { ReactNode } from 'react'

import { NextPage } from 'next'

import s from '@/shared/components/Layout/Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  return <div className={s.layout}>{children}</div>
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}
export default Layout
