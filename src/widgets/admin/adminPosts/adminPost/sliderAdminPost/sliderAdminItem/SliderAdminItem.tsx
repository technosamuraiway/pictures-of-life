import Image from 'next/image'

import s from './SliderAdminItem.module.scss'

interface IProps {
  height?: number
  onClick: () => void
  src: string
}

export const SliderAdminItem = ({ height = 240, onClick, src }: IProps) => {
  return (
    <Image
      alt={'Your post image'}
      className={s.img}
      height={height}
      onClick={onClick}
      priority
      src={src}
      width={234}
    />
  )
}
