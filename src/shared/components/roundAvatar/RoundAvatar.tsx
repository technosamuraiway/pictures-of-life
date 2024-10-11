import { ReactNode } from 'react'

import { useGetProfileQuery } from '@/services'
import { Button } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './RoundAvatar.module.scss'

import { AvatarChoice } from '../avatarChoice/AvatarChoice'

interface IProps {
  addAvatarBtnText?: string
  avatarCN?: string
  avatarWrapperCN?: string
  btnCN?: string
  deleteAvatarBtnCN?: string
  deleteAvatarBtnWrapperCN?: string
  deleteBtnChildren?: ReactNode
  imgCN?: string
  isShowAddBtn: boolean
  isShowDeleteBtn?: boolean
  onClickAddAvatar?: () => void
  onClickDeleteAvatar?: () => void
}
export const RoundAvatar = ({
  addAvatarBtnText,
  avatarCN,
  avatarWrapperCN,
  btnCN,
  deleteAvatarBtnCN,
  deleteAvatarBtnWrapperCN,
  deleteBtnChildren = '✖',
  imgCN,
  isShowAddBtn,
  isShowDeleteBtn = true,
  onClickAddAvatar,
  onClickDeleteAvatar,
}: IProps) => {
  const { data: profileData } = useGetProfileQuery()

  const avatarCondition = profileData?.avatars && profileData.avatars.length > 0 && isShowDeleteBtn

  return (
    <div className={clsx(s.wrapper, avatarWrapperCN)}>
      {avatarCondition && (
        <div className={clsx(s.deleteAvatarBtnWrapper, deleteAvatarBtnWrapperCN)}>
          <Button
            className={clsx(deleteAvatarBtnCN)}
            onClick={onClickDeleteAvatar}
            type={'button'}
            variant={'iconButton'}
          >
            {deleteBtnChildren}
          </Button>
        </div>
      )}
      <AvatarChoice imgCN={imgCN} imgSVGWrapperCN={clsx(s.imgWrapper, avatarCN)} />
      {isShowAddBtn && (
        <Button
          className={btnCN}
          fullWidth
          onClick={onClickAddAvatar}
          type={'button'}
          variant={'outline'}
        >
          {addAvatarBtnText}
        </Button>
      )}
    </div>
  )
}
