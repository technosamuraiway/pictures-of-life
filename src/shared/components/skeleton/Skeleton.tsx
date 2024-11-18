import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './Skeleton.module.scss'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  height?: number | string
  width?: number | string
}

export const Skeleton = ({ className = '', height, width, ...rest }: IProps) => {
  const style: CSSProperties = {}

  if (width !== undefined) {
    style.width = width
  }

  if (height !== undefined) {
    style.height = height
  }

  const fullSize = width === undefined && height === undefined

  return (
    <div
      className={clsx(styles.skeleton, fullSize && styles.fullSize, className)}
      style={style}
      {...rest}
    >
      <div className={styles.shimmer}></div>
    </div>
  )
}
