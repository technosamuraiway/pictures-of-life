import { Dispatch, SetStateAction } from 'react'

import { PreviewImgScreen } from '@/entities/components/previewImgScreen/PreviewImgScreen'
import { AvatarChoice, useRouterLocaleDefinition } from '@/shared'

import s from './BeforeEditor.module.scss'

interface IProps {
  errorText: null | string
  maxImgSize: number
  onEditMode: (edit: boolean) => void
  setErrorText: (error: null | string) => void
  setImage: Dispatch<SetStateAction<string[]>>
}

export const BeforeEditor = ({
  errorText,
  maxImgSize,
  onEditMode,
  setErrorText,
  setImage,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <PreviewImgScreen
      addImgBtnText={t.avatarChange.addAvatar.addAvatarModalButtonText}
      errorSizeText={t.avatarChange.errors.errorSizeText}
      errorText={errorText}
      maxImgSize={maxImgSize}
      onEditMode={onEditMode}
      setErrorText={setErrorText}
      setImage={setImage}
    >
      <AvatarChoice imgCN={s.imgAvatar} imgSVGWrapperCN={s.imgWrapper} />
    </PreviewImgScreen>
  )
}
