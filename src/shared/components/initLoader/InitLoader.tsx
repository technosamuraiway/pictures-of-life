import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './InitLoader.module.scss'

type Props = {
  loaderCN?: string
} & ComponentPropsWithoutRef<'div'>

export const InitLoader = ({ loaderCN, ...rest }: Props) => {
  return (
    <div className={clsx(loaderCN, s.container)} {...rest}>
      <div className={s.loader}>
        <span></span>
      </div>
    </div>
  )
}
