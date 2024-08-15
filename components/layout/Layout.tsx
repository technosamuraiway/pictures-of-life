import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

import { NavBar } from '../navBar/NavBar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.layout}>
      <NavBar />
      {children}
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export interface RootObject {
  body: string
  id: number
  title: string
  userId: number
}
