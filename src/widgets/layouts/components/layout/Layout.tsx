import { PropsWithChildren } from 'react'

import { PATH } from '@/shared'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

const NoSSRHeaderComponent = dynamic(
  () => import('@technosamurai/techno-ui-kit').then(mod => mod.Header),
  { ssr: false }
)

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const changeLangHandler = (locale: string) => {
    const { asPath, pathname, query } = router

    router.push({ pathname, query }, asPath, { locale })
  }

  const logoClickHandler = () => {
    router.push(PATH.HOME)
  }

  return (
    <div className={s.layout}>
      <NoSSRHeaderComponent
        changeLangHandler={changeLangHandler}
        className={s.header}
        onLogoClick={logoClickHandler}
      />
      <div className={s.content}>{children}</div>
    </div>
  )
}
