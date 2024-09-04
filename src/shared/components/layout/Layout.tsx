import { ReactNode } from 'react'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Layout.module.scss'

interface IProps {
  children: ReactNode
}

const Layout: NextPage<IProps> = ({ children }) => {
  const router = useRouter()
  const t = useRouterLocaleDefinition()
  const changeLangHandler = (locale: string) => {
    const { asPath, pathname, query } = router

    router.push({ pathname, query }, asPath, { locale })
  }

  const handleLogoClick = () => {
    router.push(PATH.HOME)
  }

  return (
    <div className={s.layout}>
      <Header changeLangHandler={changeLangHandler} onLogoClick={handleLogoClick} />
      {/* Link - временные ссылки, чтобы показать работу NextTopLoader */}
      <div className={s.links}>
        <Link href={PATH.HOME}>Home</Link>
        <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
        <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
      </div>
      <main>{children}</main>
    </div>
  )
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default Layout
