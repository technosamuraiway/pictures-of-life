import { useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { AdaptiveTranslation, PATH, useRouterLocaleDefinition } from '@/shared'
import {
  ActiveCreateIcon,
  ActiveFavoritesIcon,
  ActiveHomeIcon,
  ActiveMessengerIcon,
  ActiveProfileIcon,
  ActiveSearchIcon,
  ActiveStatisticsIcon,
  DefaultCreateIcon,
  DefaultFavoritesIcon,
  DefaultHomeIcon,
  DefaultMessengerIcon,
  DefaultProfileIcon,
  DefaultSearchIcon,
  DefaultStatisticsIcon,
  LogOutIcon,
} from '@public/sideBar'
import { Button, NavItem, Typography } from '@technosamurai/techno-ui-kit'

import s from './NavBar.module.scss'

import { NavBarItems } from './navBarItems/NavBarItems'

export function NavBar() {
  const t = useRouterLocaleDefinition()
  const [currentPath, setCurrentPath] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)

  // Данные для навигации
  const firstItems: NavItem[] = [
    {
      activeIconComponent: <ActiveHomeIcon />,
      altText: `${t.navBar.home} Icon`,
      defaultIconComponent: <DefaultHomeIcon />,
      hrefLink: PATH.HOME,
      id: 159,
      isDisabled: false,
      text: t.navBar.home,
    },
    {
      activeIconComponent: <ActiveCreateIcon />,
      altText: `${t.navBar.create} Icon`,
      defaultIconComponent: <DefaultCreateIcon />,
      hrefLink: '#Create',
      id: 753,
      isDisabled: false,
      text: t.navBar.create,
    },
    {
      activeIconComponent: <ActiveProfileIcon />,
      altText: `${t.navBar.myProfile} Icon`,
      defaultIconComponent: <DefaultProfileIcon />,
      hrefLink: '#My Profile',
      id: 456,
      isDisabled: false,
      text: t.navBar.myProfile,
    },
    {
      activeIconComponent: <ActiveMessengerIcon />,
      altText: `${t.navBar.messenger} Icon`,
      defaultIconComponent: <DefaultMessengerIcon />,
      hrefLink: '#Messenger',
      id: 789,
      isDisabled: false,
      text: t.navBar.messenger,
    },
    {
      activeIconComponent: <ActiveSearchIcon />,
      altText: `${t.navBar.search} Icon`,
      defaultIconComponent: <DefaultSearchIcon />,
      hrefLink: '#Search',
      id: 123,
      isDisabled: false,
      text: t.navBar.search,
    },
  ]
  const secondItems: NavItem[] = [
    {
      activeIconComponent: <ActiveStatisticsIcon />,
      altText: `${t.navBar.statistics} Icon`,
      defaultIconComponent: <DefaultStatisticsIcon />,
      hrefLink: '#Statistics',
      id: 147,
      isDisabled: false,
      text: t.navBar.statistics,
    },
    {
      activeIconComponent: <ActiveFavoritesIcon />,
      altText: `${t.navBar.favorites} Icon`,
      defaultIconComponent: <DefaultFavoritesIcon />,
      hrefLink: '#Favorites',
      id: 258,
      isDisabled: false,
      text: t.navBar.favorites,
    },
  ]

  // ------ Работа с навигацией -------
  const activeConditionFunctionHandler = (itemPath: string) => {
    return itemPath === currentPath
  }

  const onSideBarItemClickHandler = (path: string) => {
    setCurrentPath(path)
  }

  // ------ Работа с модальным окном -------
  const onClickLogOutHandler = () => {
    setOpenModal(true)
  }

  const onClickModalNegativeButtonHandler = () => {
    setOpenModal(false)
  }

  const onClickModalPositiveButtonHandler = () => {
    setOpenModal(false)
  }

  // Здесь мы достанем email из "ME" запроса, когда он будет:-)
  const email = 'Test@gmail.com'

  return (
    <nav className={s.wrapper}>
      <NavBarItems
        activeConditionFunction={activeConditionFunctionHandler}
        items={firstItems}
        onNavBarItemClick={onSideBarItemClickHandler}
      />
      <NavBarItems
        activeConditionFunction={activeConditionFunctionHandler}
        items={secondItems}
        onNavBarItemClick={onSideBarItemClickHandler}
        wrapperClassName={s.secondArrayWrapper}
      />
      <Button className={s.logOutButton} onClick={onClickLogOutHandler} variant={'iconButton'}>
        <span className={s.logOutIcon}>
          <LogOutIcon />
        </span>
        <Typography variant={'medium-text-14'}>{t.logOut.logOutButton}</Typography>
      </Button>
      <ActionConfirmationModal
        headerTitle={t.logOut.logOutModalHeader}
        isOpenModal={openModal}
        modalTextChildren={
          <AdaptiveTranslation
            tags={{
              1: () => <Typography className={s.email}>{email}</Typography>,
            }}
            text={t.logOut.logOutText}
          />
        }
        negativeButtonChildren={t.logOut.buttonNo}
        onClickPositiveButton={onClickModalPositiveButtonHandler}
        positiveButtonChildren={t.logOut.buttonYes}
        setIsOpenModal={setOpenModal}
      />
    </nav>
  )
}
