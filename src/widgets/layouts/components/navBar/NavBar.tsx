import { useState } from 'react'

import { useLazyMeCurInfoQuery } from '@/services'
import { inctagramApi } from '@/services/api/inctagram.api'
import { useAppDispatch } from '@/services/store'
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
  const [meDataLazy] = useLazyMeCurInfoQuery()

  const dispatch = useAppDispatch()

  const { handleLogout, isLoadingLogout } = useLogout()
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('TestEmail@.com')

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
    const result = await meDataLazy()

    if (result) {
      setEmail(result.data?.email as string)
      setOpenModal(true)
    }
  }

  const onClickModalPositiveButtonHandler = async () => {
    await handleLogout()

    /* 📛 очистка всего кеша STORE 📛
     * зачем нужно? => после logout, у нас остается me-запрос в кеше,
     * и когда мы через routes переходим ДАЖЕ на приватную страницу
     * me-запрос не происходит, так как он в кеше...
     * => даже после logout мы можем посещать приватные страницы
     *
     * почему бы не воспользоваться ВАЛИДАЦИЕЙ тегов в RTK-query-api ['me']?
     * => потому что Logout запрос ничего не возвращает => валидацию на него не повесить */
    dispatch(inctagramApi.util.resetApiState())

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
        email={email}
        isDisableButtons={isLoadingLogout}
        isOpenModal={openModal}
        onClickLogOutBtn={onClickLogOutHandler}
        onClickModalPositiveButton={onClickModalPositiveButtonHandler}
        setOpenModal={setOpenModal}
      />
    </nav>
  )
}
