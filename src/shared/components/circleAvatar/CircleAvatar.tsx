import { memo } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import s from './CircleAvatar.module.scss'

interface IProps {
  height?: number
  name: string
  rootCN?: string
  src: string
  width?: number
}

export const CircleAvatar = memo(({ height = 36, name, rootCN, src, width = 36 }: IProps) => {
  return (
    <>
      {src ? (
        <Image
          alt={'circle-avatar'}
          className={clsx(rootCN, s.root)}
          height={height}
          src={src}
          width={width}
        />
      ) : (
        <span
          className={clsx(rootCN, s.root, s.circleWithoutAvatar)}
          style={{ height: `${height}px`, width: `${width}px` }}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </>
  )
})
