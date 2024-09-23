import { ChangeEvent, ElementRef, ReactNode, forwardRef } from 'react'

import { useGetProfileQuery } from '@/services'
import { AvatarChoice, DownloadFile, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './BeforeEditor.module.scss'

interface IProps {
  errorText?: ReactNode
  onChangeFileImg: (e: ChangeEvent<HTMLInputElement>) => void
  onClickAddAvatar: () => void
}

export const BeforeEditor = forwardRef<ElementRef<'input'>, IProps>(
  ({ errorText, onChangeFileImg, onClickAddAvatar }, ref) => {
    const t = useRouterLocaleDefinition()
    const { data: profileData } = useGetProfileQuery()

    const avatarCondition = profileData?.avatars && profileData.avatars.length > 0

    return (
      <div className={s.wrapper}>
        {errorText && (
          <div className={s.errorWrapper}>
            <Typography variant={'regular-text-14'}>{errorText}</Typography>
          </div>
        )}
        <AvatarChoice
          avatarSrc={profileData?.avatars}
          imgCN={s.imgAvatar}
          imgWrapperCN={s.imgWrapper}
          mainCondition={avatarCondition}
          userName={profileData?.userName}
        />
        <DownloadFile
          btnText={t.avatarChange.addAvatarModalButtonText}
          onBtnClick={onClickAddAvatar}
          onChangeFile={onChangeFileImg}
          ref={ref}
        />
      </div>
    )
  }
)
