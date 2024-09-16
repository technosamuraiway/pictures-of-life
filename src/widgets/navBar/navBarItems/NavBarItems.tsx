import { NavBarItem, NavItem } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './NavBarItems.module.scss'

interface IProps {
  activeConditionFunction: (itemPath: string) => boolean
  items: NavItem[]
  wrapperClassName?: string
}

export const NavBarItems = ({ activeConditionFunction, items, wrapperClassName }: IProps) => {
  return (
    <div className={clsx(s.arrayWrapper, wrapperClassName)}>
      {items.map(el => {
        return (
          <NavBarItem
            activeCondition={activeConditionFunction}
            as={Link}
            href={el.hrefLink}
            item={el}
            key={el.id}
            onNavBarItemClick={() => {}}
          />
        )
      })}
    </div>
  )
}
