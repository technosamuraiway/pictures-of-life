import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

import { Header } from '../Header'
import { NavBar } from '../navBar/NavBar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.layout}>
        <NavBar />
        {children}
      </main>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
