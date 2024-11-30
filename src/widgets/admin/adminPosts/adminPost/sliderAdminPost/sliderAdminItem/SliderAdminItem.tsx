import Image from 'next/image'

import s from './SliderAdminItem.module.scss'

interface IProps {
  onClick: () => void
  src: string
}

export const SliderAdminItem = ({ onClick, src }: IProps) => {
  return (
    <Image
      alt={'Your post image'}
      className={s.img}
      height={240}
      onClick={onClick}
      priority
      src={src}
      width={234}
    />
  )
}
