import { useGetLatestMessengersQuery } from '@/services'
import { PATH } from '@/shared'
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
  const { data: getLatestMessengersData } = useGetLatestMessengersQuery({})

  return (
    <div className={clsx(s.arrayWrapper, wrapperClassName)}>
      {items.map(el => {
        return (
          <NavBarItem
            activeCondition={activeConditionFunction}
            as={Link}
            digitsCondition={el.hrefLink === PATH.MESSENGER}
            href={el.hrefLink}
            item={el}
            key={el.id}
            unReadCount={getLatestMessengersData?.notReadCount}
          />
        )
      })}
    </div>
  )
}
