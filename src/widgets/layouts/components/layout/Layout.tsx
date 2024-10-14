import { PropsWithChildren, useState } from 'react'

import { PATH } from '@/shared'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

import { languageSelectOptions } from './languageSelectOptions'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { asPath, pathname, query } = router

  /* Управление стейтом кнопки выбора языка.
   *  Начальное значение берется из uri-params
   *  */
  const [langValue, setLangValue] = useState(router.locale ?? 'en')

  function changeLanguageBtnHandler(value: string) {
    setLangValue(value)
    router.push({ pathname, query }, asPath, { locale: value })
  }

  /* cb-function для возврата на страничку Home */
  const logoClickHandler = () => {
    router.push(PATH.HOME)
  }

  return (
    <div className={s.layout}>
      <Header
        changeLanguageBtn={changeLanguageBtnHandler}
        changeLanguageBtnCurrentValue={langValue}
        changeLanguageBtnOptions={languageSelectOptions}
        className={s.header}
        onLogoClick={logoClickHandler}
      />

      <div className={s.container}>{children}</div>
    </div>
  )
}
