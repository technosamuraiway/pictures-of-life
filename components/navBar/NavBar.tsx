import Link from 'next/link'

import s from './navBar.module.scss'

import { useRouterLocaleDefinition } from '../../hooks/useRouterLocaleDefinition'

export const NavBar = () => {
  const routerLocale = useRouterLocaleDefinition()

  return (
    <div className={s.navBar}>
      <Link href={'/'}>{routerLocale.title}</Link>
      <Link href={'/signUp'}>{routerLocale.signUpPage.title}</Link>
      <Link href={'/signIn'}>{routerLocale.signInPage.title}</Link>
    </div>
  )
}
