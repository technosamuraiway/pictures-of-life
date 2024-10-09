import { ReactNode } from 'react'

import clsx from 'clsx'

import s from './NavArrow.module.scss'

interface IProps {
  arrowCN?: string
  children?: ReactNode
  onArrowClick: () => void
}

export const NavArrow = ({ arrowCN, children, onArrowClick }: IProps) => {
  return (
    <button className={clsx(s.navArrow, arrowCN)} onClick={onArrowClick} type={'button'}>
      {children}
    </button>
  )
}
