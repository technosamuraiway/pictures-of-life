import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import clsx from 'clsx'
import Image from 'next/image'

import s from './SquareImg.module.scss'

interface IProps {
  altText?: string
  imgSVGWrapperCN?: string
  imgSvgCN?: string
}
export const SquareImg = ({ altText = 'Empty avatar', imgSVGWrapperCN, imgSvgCN }: IProps) => {
  return (
    <div className={clsx(s.imgWrapper, imgSVGWrapperCN)}>
      <Image alt={altText} className={clsx(s.avatarImgSvg, imgSvgCN)} src={emptyAvatar} />
    </div>
  )
}
