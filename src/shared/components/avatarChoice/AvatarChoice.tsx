import { useGetProfileQuery } from '@/services'
import clsx from 'clsx'
import Image from 'next/image'

import s from './AvatarChoice.module.scss'

import { SquareImg } from '../squareImg/SquareImg'

interface IProps {
  height?: number
  imgCN?: string
  imgSVGWrapperCN?: string
  imgSvgCN?: string
  mainCondition?: boolean
  userName?: string
  width?: number
}

export const AvatarChoice = ({
  height = 196,
  imgCN,
  imgSVGWrapperCN,
  imgSvgCN,
  width = 196,
}: IProps) => {
  const { data: profileData } = useGetProfileQuery()

  const hasValidAvatar =
    profileData?.avatars && profileData.avatars.length > 0 && profileData.avatars[0]?.url

  return hasValidAvatar ? (
    <Image
      alt={`${profileData?.userName} avatar`}
      className={clsx(s.avatarImg, imgCN)}
      height={height}
      priority
      src={profileData.avatars[0].url}
      width={width}
    />
  ) : (
    <SquareImg
      altText={`${profileData?.userName} empty avatar`}
      imgSVGWrapperCN={imgSVGWrapperCN}
      imgSvgCN={imgSvgCN}
    />
  )
}
