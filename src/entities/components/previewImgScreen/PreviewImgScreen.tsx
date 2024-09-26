import { ReactNode } from 'react'

import { DownloadFile } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './PreviewImgScreen.module.scss'

interface IProps {
  addImgBtnText: string
  children: ReactNode
  errorSizeText: string
  errorText: null | string
  maxImgSize: number

  onEditMode: (edit: boolean) => void
  setErrorText: (error: null | string) => void
  setImage: (img: File | string) => void
}

export const PreviewImgScreen = ({
  addImgBtnText,
  children,
  errorSizeText,
  errorText,
  maxImgSize,
  onEditMode,
  setErrorText,
  setImage,
}: IProps) => {
  return (
    <div className={s.wrapper}>
      {errorText && (
        <div className={s.errorWrapper}>
          <Typography variant={'regular-text-14'}>{errorText}</Typography>
        </div>
      )}
      {children}
      <DownloadFile
        btnText={addImgBtnText}
        errorSizeText={errorSizeText}
        maxImgSize={maxImgSize}
        onEditMode={onEditMode}
        setError={setErrorText}
        setImage={setImage}
      />
    </div>
  )
}
