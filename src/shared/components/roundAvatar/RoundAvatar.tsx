import { ReactNode } from 'react'

import { useGetProfileQuery } from '@/services'
import { Button } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './RoundAvatar.module.scss'

import { AvatarChoice } from '../avatarChoice/AvatarChoice'

interface IProps {
  addAvatarBtnText: string
  avatarWrapperCN?: string
  btnCN?: string
  deleteAvatarBtnCN?: string
  deleteAvatarBtnWrapperCN?: string
  deleteBtnChildren?: ReactNode
  isShowAddBtn: boolean
  onClickAddAvatar?: () => void
  onClickDeleteAvatar?: () => void
}
export const RoundAvatar = ({
  addAvatarBtnText,
  avatarWrapperCN,
  btnCN,
  deleteAvatarBtnCN,
  deleteAvatarBtnWrapperCN,
  deleteBtnChildren = '✖',
  isShowAddBtn,
  onClickAddAvatar,
  onClickDeleteAvatar,
}: IProps) => {
  const { data: profileData } = useGetProfileQuery()

  const avatarCondition = profileData?.avatars && profileData.avatars.length > 0

  return (
    <div className={clsx(s.wrapper, avatarWrapperCN)}>
      {avatarCondition && (
        <div className={clsx(s.deleteAvatarBtnWrapper, deleteAvatarBtnWrapperCN)}>
          <Button
            className={clsx(s.deleteAvatarBtn, deleteAvatarBtnCN)}
            onClick={onClickDeleteAvatar}
            type={'button'}
            variant={'iconButton'}
          >
            {deleteBtnChildren}
          </Button>
        </div>
      )}
      <AvatarChoice imgSVGWrapperCN={s.imgWrapper} />
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
