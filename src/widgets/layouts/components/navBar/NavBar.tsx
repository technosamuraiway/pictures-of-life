import { useState } from 'react'

import { PATH, useLogout, useRouterLocaleDefinition } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import {
  ActiveCreateIcon,
  ActiveFavoritesIcon,
  ActiveHomeIcon,
  ActiveMessengerIcon,
  ActivePaymentsList,
  ActivePostsList,
  ActiveProfileIcon,
  ActiveSearchIcon,
  ActiveStatisticsIcon,
  DefaultCreateIcon,
  DefaultFavoritesIcon,
  DefaultHomeIcon,
  DefaultMessengerIcon,
  DefaultPaymentsList,
  DefaultPostsList,
  DefaultProfileIcon,
  DefaultSearchIcon,
  DefaultStatisticsIcon,
  NavItem,
} from '@technosamurai/techno-ui-kit'

import s from './NavBar.module.scss'

import { LogOutItem } from './logOutItem/LogOutItem'
import { NavBarItems } from './navBarItems/NavBarItems'

export function NavBar() {
  const { isOwnProfile, meData, router } = useMeWithRouter()

  const { handleLogout, isLoadingLogout } = useLogout()
  const t = useRouterLocaleDefinition()

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
    {
      activeIconComponent: <ActiveFavoritesIcon />,
      altText: `${t.navBar.admin} Icon`,
      defaultIconComponent: <DefaultFavoritesIcon />,
      hrefLink: '/auth/signIn-admin',
      id: 259,
      isDisabled: false,
      text: t.navBar.admin,
    },
  ]
  const adminNavbarItems: NavItem[] = [
    {
      activeIconComponent: <ActiveProfileIcon />,
      altText: `${t.admin.usersList} Icon`,
      defaultIconComponent: <DefaultProfileIcon />,
      hrefLink: '/admin/users-list',
      id: 1,
      isDisabled: false,
      text: t.admin.usersList.title,
    },
    {
      activeIconComponent: <ActiveStatisticsIcon />,
      altText: `${t.admin.statistics} Icon`,
      defaultIconComponent: <DefaultStatisticsIcon />,
      hrefLink: '/admin/statistics',
      id: 2,
      isDisabled: false,
      text: t.admin.statistics.title,
    },
    {
      activeIconComponent: <ActivePaymentsList />,
      altText: `${t.admin.paymentsList} Icon`,
      defaultIconComponent: <DefaultPaymentsList />,
      hrefLink: '',
      id: 3,
      isDisabled: false,
      text: t.admin.paymentsList.title,
    },
    {
      activeIconComponent: <ActivePostsList />,
      altText: `${t.admin.postsList} Icon`,
      defaultIconComponent: <DefaultPostsList />,
      hrefLink: PATH.ADMIN.ADMINPOSTSLIST,
      id: 4,
      isDisabled: false,
      text: t.admin.postsList.title,
    },
  ]

  // ------ Работа с навигацией -------
  const activeConditionFunctionHandler = (itemPath: string) => {
    if (itemPath === PATH.HOME) {
      return router.pathname === PATH.HOME
    }

    if (isOwnProfile && itemPath === `${PATH.PROFILE.BASEPROFILE}/${meData?.userId}`) {
      return true
    }

    // Allow partial matches for specific base paths like "/admin"
    if (itemPath === '/admin') {
      return router.pathname.startsWith('/admin/users-list')
    }

    // Default to exact match
    return router.pathname === itemPath
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
    <>
      <nav className={s.wrapper}>
        {router.pathname.includes('/admin') ? (
          <NavBarItems
            activeConditionFunction={activeConditionFunctionHandler}
            items={adminNavbarItems}
          />
        ) : (
          <>
            <NavBarItems
              activeConditionFunction={activeConditionFunctionHandler}
              items={firstItems}
            />
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
          </>
        )}
      </nav>
    </>
  )
}
