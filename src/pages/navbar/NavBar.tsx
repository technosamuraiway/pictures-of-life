import { useState } from 'react'

import { PATH, getBaseLayout } from '@/shared'
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
import { Button, NavBarItem, NavItem, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './NavBar.module.scss'

const firstItems: NavItem[] = [
  {
    activeIconComponent: <ActiveHomeIcon />,
    altText: 'Home Icon',
    defaultIconComponent: <DefaultHomeIcon />,
    hrefLink: PATH.HOME,
    id: 159,
    isDisabled: false,
    text: 'Home',
  },
  {
    activeIconComponent: <ActiveCreateIcon />,
    altText: 'Create Icon',
    defaultIconComponent: <DefaultCreateIcon />,
    hrefLink: '#Create',
    id: 753,
    isDisabled: false,
    text: 'Create',
  },
  {
    activeIconComponent: <ActiveProfileIcon />,
    altText: 'My Profile Icon',
    defaultIconComponent: <DefaultProfileIcon />,
    hrefLink: '#My Profile',
    id: 456,
    isDisabled: false,
    text: 'My Profile',
  },
  {
    activeIconComponent: <ActiveMessengerIcon />,
    altText: 'Messenger Icon',
    defaultIconComponent: <DefaultMessengerIcon />,
    hrefLink: '#Messenger',
    id: 789,
    isDisabled: false,
    text: 'Messenger',
  },
  {
    activeIconComponent: <ActiveSearchIcon />,
    altText: 'Search Icon',
    defaultIconComponent: <DefaultSearchIcon />,
    hrefLink: '#Search',
    id: 123,
    isDisabled: false,
    text: 'Search',
  },
]

const secondItems: NavItem[] = [
  {
    activeIconComponent: <ActiveStatisticsIcon />,
    altText: 'Statistics Icon',
    defaultIconComponent: <DefaultStatisticsIcon />,
    hrefLink: '#Statistics',
    id: 147,
    isDisabled: false,
    text: 'Statistics',
  },
  {
    activeIconComponent: <ActiveFavoritesIcon />,
    altText: 'Favorites Icon',
    defaultIconComponent: <DefaultFavoritesIcon />,
    hrefLink: '#Favorites',
    id: 258,
    isDisabled: false,
    text: 'Favorites',
  },
]

function NavBar() {
  const [currentPath, setCurrentPath] = useState<string>('')

  const activeConditionFunction = (itemPath: string) => {
    return itemPath === currentPath
  }

  const onSideBarItemClickHandler = (path: string) => {
    setCurrentPath(path)
  }

  return (
    <nav className={s.wrapper}>
      <div className={s.firstArrayWrapper}>
        {firstItems.map(el => {
          return (
            <NavBarItem
              activeCondition={activeConditionFunction}
              as={Link}
              href={el.hrefLink}
              item={el}
              key={el.id}
              onNavBarItemClick={onSideBarItemClickHandler}
            />
          )
        })}
      </div>
      <div className={s.secondArrayWrapper}>
        {secondItems.map(el => {
          return (
            <NavBarItem
              activeCondition={activeConditionFunction}
              as={Link}
              href={el.hrefLink}
              item={el}
              key={el.id}
              onNavBarItemClick={onSideBarItemClickHandler}
            />
          )
        })}
      </div>
      <Button className={s.logOutButton} variant={'iconButton'}>
        <span className={s.logOutIcon}>
          <LogOutIcon />
        </span>
        <Typography variant={'medium-text-14'}>Log Out</Typography>
      </Button>
    </nav>
  )
}

NavBar.getLayout = getBaseLayout
export default NavBar
