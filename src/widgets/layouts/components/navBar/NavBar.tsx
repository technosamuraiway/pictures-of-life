import { useState } from 'react'

import { useAppSelector } from '@/services'
import { meSelectorData } from '@/services/selectors/auth.selectors'
import { PATH, useLogout, useRouterLocaleDefinition } from '@/shared'
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
  NavItem,
} from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './NavBar.module.scss'

import { LogOutItem } from './logOutItem/LogOutItem'
import { NavBarItems } from './navBarItems/NavBarItems'

export function NavBar() {
  const meData = useAppSelector(meSelectorData)

  const { handleLogout, isLoadingLogout } = useLogout()
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const isOwnProfile = meData?.userId == router.query.userId

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
      hrefLink: PATH.CREATEPOST,
      id: 753,
      isDisabled: false,
      text: t.navBar.create,
    },
    {
      activeIconComponent: <ActiveProfileIcon />,
      altText: `${t.navBar.myProfile} Icon`,
      defaultIconComponent: <DefaultProfileIcon />,
      hrefLink: `${PATH.PROFILE.BASEPROFILE}/${meData?.userId}`,
      id: 456,
      isDisabled: false,
      text: t.navBar.myProfile,
    },
    {
      activeIconComponent: <ActiveMessengerIcon />,
      altText: `${t.navBar.messenger} Icon`,
      defaultIconComponent: <DefaultMessengerIcon />,
      hrefLink: '/messenger',
      id: 789,
      isDisabled: false,
      text: t.navBar.messenger,
    },
    {
      activeIconComponent: <ActiveSearchIcon />,
      altText: `${t.navBar.search} Icon`,
      defaultIconComponent: <DefaultSearchIcon />,
      hrefLink: '/Search',
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
      hrefLink: '/Statistics',
      id: 147,
      isDisabled: false,
      text: t.navBar.statistics,
    },
    {
      activeIconComponent: <ActiveFavoritesIcon />,
      altText: `${t.navBar.favorites} Icon`,
      defaultIconComponent: <DefaultFavoritesIcon />,
      hrefLink: '/Favorites',
      id: 258,
      isDisabled: false,
      text: t.navBar.favorites,
    },
  ]

  // ------ Работа с навигацией -------
  const activeConditionFunctionHandler = (itemPath: string) => {
    if (itemPath === PATH.HOME) {
      return router.pathname === PATH.HOME
    } else {
      const trimmedPath = '/' + itemPath.split('/').slice(1, 2)

      // условие для не active icon in nav когда чужой профиль
      if (!isOwnProfile && itemPath === `${PATH.PROFILE.BASEPROFILE}/${meData?.userId}`) {
        return false
      }

      return router.pathname.startsWith(trimmedPath) && router.pathname !== PATH.HOME
    }
  }

  // ------ Работа с модальным окном -------
  const onClickLogOutHandler = async () => {
    setOpenModal(true)
  }

  const onClickModalPositiveButtonHandler = async () => {
    await handleLogout()
    setOpenModal(false)
  }

  return (
    <nav className={s.wrapper}>
      <NavBarItems activeConditionFunction={activeConditionFunctionHandler} items={firstItems} />
      <NavBarItems
        activeConditionFunction={activeConditionFunctionHandler}
        items={secondItems}
        wrapperClassName={s.secondArrayWrapper}
      />
      <LogOutItem
        email={meData?.email}
        isDisableButtons={isLoadingLogout}
        isOpenModal={openModal}
        onClickLogOutBtn={onClickLogOutHandler}
        onClickModalPositiveButton={onClickModalPositiveButtonHandler}
        setOpenModal={setOpenModal}
      />
    </nav>
  )
}
