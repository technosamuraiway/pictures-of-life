import { PropsWithChildren, useMemo, useState } from 'react'

import { useWsNotificationsStore } from '@/services/websocket/store/use-ws-notofocations-store'
import { PATH, PUBLIC_ROUTES_SET_WITH_BTN, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { NotificationsComponent } from '@/widgets/layouts/components/notificationsComponent/notificationsComponent'
import { Header } from '@technosamurai/techno-ui-kit'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from './Layout.module.scss'

import { languageSelectOptions } from './languageSelectOptions'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const { meData: meRequestData, router } = useMeWithRouter()
  const { asPath, pathname, query } = router

  const t = useRouterLocaleDefinition()

  const isWithButtons = !meRequestData && PUBLIC_ROUTES_SET_WITH_BTN.has(pathname)

  const notifications = useWsNotificationsStore(state => state.notifications)

  const notificationsToShow = useMemo(() => {
    return notifications
      .map(notification => ({
        createdAt: notification.createdAt,
        id: notification.id,
        isRead: notification.isRead,
        message: notification.message,
        notifyAt: notification.notifyAt,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [notifications])

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
        additionalLogoText={router.pathname.includes('/admin') ? 'Super' : ''}
        additionalLogoTextBold={router.pathname.includes('/admin') ? 'Admin' : ''}
        changeLanguageBtn={changeLanguageBtnHandler}
        changeLanguageBtnCurrentValue={langValue}
        changeLanguageBtnOptions={languageSelectOptions}
        className={s.header}
        logInBtnChildren={t.publicButtons.logIn}
        notificationComponent={<NotificationsComponent notifications={notificationsToShow} />}
        notificationNumber={notificationsToShow.length}
        onLogInClick={logInClickHandler}
        onLogoClick={logoClickHandler}
        onSignUpClick={signUpClickHandler}
        signUpBtnChildren={t.publicButtons.signUp}
        withAuthButtons={isWithButtons}
        withNotifications={!isWithButtons}
      />
      <div className={s.scrollContainer}>
        <div className={s.container}>{children}</div>
      </div>
    </>
  )
}
