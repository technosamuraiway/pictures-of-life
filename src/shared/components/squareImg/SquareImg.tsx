import { EmptyAvatar } from '@public/profileAvatar/EmptyAvatar'
import clsx from 'clsx'

import s from './SquareImg.module.scss'

interface IProps {
  imgSVGWrapperCN?: string
  imgSvgCN?: string
}
export const SquareImg = ({ imgSVGWrapperCN, imgSvgCN }: IProps) => {
  return (
    <div className={clsx(s.imgWrapper, imgSVGWrapperCN)}>
      <EmptyAvatar className={clsx(s.avatarImgSvg, imgSvgCN)} />
    </div>
  )
}
