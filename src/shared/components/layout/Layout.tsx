import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

interface IProps {
  children: ReactNode
}

const Layout: NextPage<IProps> = ({ children }) => {
  const router = useRouter()
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
        <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
      </div>
      <main>{children}</main>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
        transition={Slide}
      />
    </div>
  )
}

export const getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default Layout
