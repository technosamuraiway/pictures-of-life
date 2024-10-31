import { memo } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import s from './CircleAvatar.module.scss'

interface IProps {
  height?: number
  rootCN?: string
  src: string
  width?: number
}

export const CircleAvatar = memo(({ height = 36, rootCN, src, width = 36 }: IProps) => {
  return (
    <Image
      alt={'circle-avatar'}
      className={clsx(rootCN, s.root)}
      height={height}
      src={src}
      width={width}
    />
  )
})
