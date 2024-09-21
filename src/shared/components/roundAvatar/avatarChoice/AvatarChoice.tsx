import { AvatarsType } from '@/services/types/profile.types'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import clsx from 'clsx'
import Image from 'next/image'

import s from './AvatarChoice.module.scss'

interface IProps {
  avatarSrc?: AvatarsType[]
  height?: number
  imgCN?: string
  imgSvgCN?: string
  imgWrapperCN?: string
  mainCondition?: boolean
  userName?: string
  width?: number
}

export const AvatarChoice = ({
  avatarSrc,
  height = 196,
  imgCN,
  imgSvgCN,
  imgWrapperCN,
  mainCondition,
  userName = 'User',
  width = 196,
}: IProps) => {
  const hasValidAvatar = mainCondition && avatarSrc && avatarSrc.length > 0 && avatarSrc[0]?.url

  return hasValidAvatar ? (
    <Image
      alt={`${userName} avatar`}
      className={clsx(s.avatarImg, imgCN)}
      height={height}
      src={avatarSrc[0].url}
      width={width}
    />
  ) : (
    <div className={clsx(s.imgWrapper, imgWrapperCN)}>
      <Image
        alt={`${userName} avatar`}
        className={clsx(s.avatarImgSvg, imgSvgCN)}
        src={emptyAvatar}
      />
    </div>
  )
}
