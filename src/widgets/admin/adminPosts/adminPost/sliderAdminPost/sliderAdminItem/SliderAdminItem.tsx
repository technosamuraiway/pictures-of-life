import clsx from 'clsx'
import Image from 'next/image'

import s from './SliderAdminItem.module.scss'

interface IProps {
  className?: string
  height?: number
  onClick: () => void
  src: string
}

export const SliderAdminItem = ({ className, height = 240, onClick, src }: IProps) => {
  return (
    <Image
      alt={'Your post image'}
      className={clsx(s.img, className)}
      height={height}
      onClick={onClick}
      priority
      src={src}
      width={234}
    />
  )
}
