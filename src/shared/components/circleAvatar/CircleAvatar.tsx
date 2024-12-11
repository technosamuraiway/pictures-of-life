import { memo } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import mockImage from 'public/mockAvatar.png'

import s from './CircleAvatar.module.scss'

interface IProps {
  height?: number
  href?: string
  rootCN?: string
  src: string
  width?: number
}

export const CircleAvatar = memo(({ height = 36, href = '', rootCN, src, width = 36 }: IProps) => {
  return (
    <Link href={href}>
      <Image
        alt={'circle-avatar'}
        className={clsx(rootCN, s.root)}
        height={height}
        priority
        src={src || mockImage}
        width={width}
      />
    </Link>
  )
})
