import { ReactNode } from 'react'

import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'

import s from './RoundAvatar.module.scss'

interface IProps {
  addAvatarBtnText: string
  avatarAltText?: string
  avatarSrc?: string
  avatarWrapperCN?: string
  btnCN?: string
  deleteAvatarBtnCN?: string
  deleteAvatarBtnWrapperCN?: string
  deleteBtnChildren?: ReactNode
  imgCN?: string
  imgWrapperCN?: string
  isShowAddBtn: boolean
  isShowDeleteBtn: boolean
  onClickAddAvatar?: () => void
  onClickDeleteAvatar?: () => void
}
export const RoundAvatar = ({
  addAvatarBtnText,
  avatarAltText = 'Avatar',
  avatarSrc = emptyAvatar,
  avatarWrapperCN,
  btnCN,
  deleteAvatarBtnCN,
  deleteAvatarBtnWrapperCN,
  deleteBtnChildren = '✖',
  imgCN,
  imgWrapperCN,
  isShowAddBtn,
  isShowDeleteBtn = false,
  onClickAddAvatar,
  onClickDeleteAvatar,
}: IProps) => {
  return (
    <div className={clsx(s.wrapper, avatarWrapperCN)}>
      {isShowDeleteBtn && (
        <div className={clsx(s.deleteAvatarBtnWrapper, deleteAvatarBtnWrapperCN)}>
          <Button
            className={clsx(s.deleteAvatarBtn, deleteAvatarBtnCN)}
            onClick={onClickDeleteAvatar}
            variant={'iconButton'}
          >
            {deleteBtnChildren}
          </Button>
        </div>
      )}
      <div className={clsx(s.imgWrapper, imgWrapperCN)}>
        <Image
          alt={avatarAltText}
          className={clsx(s.avatarImg, imgCN)}
          height={196}
          src={avatarSrc}
          width={196}
        />
      </div>
      {isShowAddBtn && (
        <Button className={btnCN} fullWidth onClick={onClickAddAvatar} variant={'outline'}>
          {addAvatarBtnText}
        </Button>
      )}
    </div>
  )
}
