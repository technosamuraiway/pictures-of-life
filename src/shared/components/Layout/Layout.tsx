import React, { ReactNode } from 'react'

import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/shared/components/Layout/Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  const router = useRouter()
  const t = useRouterLocaleDefinition()
  const changeLangHandler = (locale: string) => {
    const { asPath, pathname, query } = router

    router.push({ pathname, query }, asPath, { locale })
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className={s.layout}>
      <Header changeLangHandler={changeLangHandler} onLogoClick={handleLogoClick} />
      <main>{children}</main>
    </div>
  )
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}
export default Layout
