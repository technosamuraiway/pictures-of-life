import clsx from 'clsx'

import s from './InitLoader.module.scss'

type Props = {
  loaderCN?: string
}

export const InitLoader = ({ loaderCN }: Props) => {
  return (
    <div className={clsx(s.container, loaderCN)}>
      <div className={s.loader}>
        <span></span>
      </div>
    </div>
  )
}
