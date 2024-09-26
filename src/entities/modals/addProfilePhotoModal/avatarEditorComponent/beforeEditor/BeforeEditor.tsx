import { PreviewImgScreen } from '@/entities/components/previewImgScreen/PreviewImgScreen'
import { AvatarChoice, useRouterLocaleDefinition } from '@/shared'

import s from './BeforeEditor.module.scss'

interface IProps {
  errorText: null | string
  maxImgSize: number
  onEditMode: (edit: boolean) => void
  setErrorText: (error: null | string) => void
  setImage: (img: File | string) => void
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
      addImgBtnText={t.avatarChange.addAvatarModalButtonText}
      errorSizeText={t.avatarChange.errorSizeText}
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
