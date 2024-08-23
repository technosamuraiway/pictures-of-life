import React, { ReactNode } from 'react'

import { NextPage } from 'next'

import { Header } from '@technosamurai/techno-ui-kit'
import s from '@/shared/components/Layout/Layout.module.scss'


type Props = {
  children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className={s.layout}>
      <Header />
      {children}
    </div>
  )
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}
export default Layout
