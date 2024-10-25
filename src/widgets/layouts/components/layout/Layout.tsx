import { PropsWithChildren, useState } from 'react'

import {
  PATH,
  PUBLIC_ROUTES_SET_WITH_BTN,
  useMeWithRouter,
  useRouterLocaleDefinition,
} from '@/shared'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

import { languageSelectOptions } from './languageSelectOptions'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  // const router = useRouter()
  // const meRequestData = useAppSelector(meSelectorData)
  const { meData: meRequestData, router } = useMeWithRouter()
  const { asPath, pathname, query } = router

  const t = useRouterLocaleDefinition()

  const isWithButtons = !meRequestData && PUBLIC_ROUTES_SET_WITH_BTN.has(pathname)

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
    router.push(PATH.PUBLIC)
  }

  const logInClickHandler = () => {
    router.push(PATH.AUTH.SIGNIN)
  }

  const signUpClickHandler = () => {
    router.push(PATH.AUTH.SIGNUP)
  }

  return (
    <>
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
        withAuthButtons={isWithButtons}
      />

      <div className={s.scrollContainer}>
        <div className={s.container}>{children}</div>
      </div>
    </>
  )
}
