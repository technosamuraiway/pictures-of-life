import { PropsWithChildren, useState } from 'react'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

import { languageSelectOptions } from './LanguageSelectOptions'

export const LayoutWithAuth: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { asPath, pathname, query } = router
  const t = useRouterLocaleDefinition()
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

  const logInClickHandler = () => {
    router.push(PATH.AUTH.SIGNIN)
  }

  const signUpClickHandler = () => {
    router.push(PATH.AUTH.SIGNUP)
  }

  return (
    <div className={s.layout}>
      <Header
        changeLanguageBtn={changeLanguageBtnHandler}
        changeLanguageBtnCurrentValue={langValue}
        changeLanguageBtnOptions={languageSelectOptions}
        className={s.header}
        logInBtnChildren={t.publicButtons.logIn}
        onLogInClick={logInClickHandler}
        onLogoClick={logoClickHandler}
        onSignUpClick={signUpClickHandler}
        signUpBtnChildren={t.publicButtons.signUp}
        withAuthButtons
      />
      <div className={s.content}>{children}</div>
    </div>
  )
}
