import { useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { useLazyMeCurInfoQuery, useMeCurInfoQuery } from '@/services'
import { AdaptiveTranslation, PATH, useLogout, useRouterLocaleDefinition } from '@/shared'
import { LogOutIcon } from '@public/sideBar'
import {
  ActiveCreateIcon,
  ActiveFavoritesIcon,
  ActiveHomeIcon,
  ActiveMessengerIcon,
  ActiveProfileIcon,
  ActiveSearchIcon,
  ActiveStatisticsIcon,
  Button,
  DefaultCreateIcon,
  DefaultFavoritesIcon,
  DefaultHomeIcon,
  DefaultMessengerIcon,
  DefaultProfileIcon,
  DefaultSearchIcon,
  DefaultStatisticsIcon,
  NavItem,
  Typography,
} from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './NavBar.module.scss'

import { NavBarItems } from './navBarItems/NavBarItems'

export function NavBar() {
  const [meDataLazy] = useLazyMeCurInfoQuery()
  const { handleLogout } = useLogout()
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [email, setEmail] = useState('Test@mail.com')

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
      hrefLink: '/create',
      id: 753,
      isDisabled: false,
      text: t.navBar.create,
    },
    {
      activeIconComponent: <ActiveProfileIcon />,
      altText: `${t.navBar.myProfile} Icon`,
      defaultIconComponent: <DefaultProfileIcon />,
      hrefLink: `${PATH.PROFILE.BASEPROFILE}/1370`,
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

      return router.pathname.startsWith(trimmedPath) && router.pathname !== PATH.HOME
    }
  }

  // ------ Работа с модальным окном -------
  const onClickLogOutHandler = async () => {
    setOpenModal(true)
    const result = await meDataLazy()

    if (result) {
      setEmail(result.data?.email as string)
    }
  }

  const onClickModalPositiveButtonHandler = () => {
    setOpenModal(false)

    handleLogout()
  }

  return (
    <nav className={s.wrapper}>
      <NavBarItems activeConditionFunction={activeConditionFunctionHandler} items={firstItems} />
      <NavBarItems
        activeConditionFunction={activeConditionFunctionHandler}
        items={secondItems}
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
              1: () => (
                <Typography as={'span'} className={s.email}>
                  {email}
                </Typography>
              ),
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
