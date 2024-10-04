import { ReactNode } from 'react'

import { DownloadFile } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'

import s from './PreviewImgScreen.module.scss'

interface IProps {
  addImgBtnText: string
  children: ReactNode
  errorSizeText: string
  errorText: null | string
  maxImgSize: number
  multipleInput?: boolean
  onDraftBtnClick?: () => void
  onEditMode: (edit: boolean) => void
  openDraftBtnText?: string
  setErrorText: (error: null | string) => void
  setImage: (
    images: (File | string)[] | ((prevImages: (File | string)[]) => (File | string)[])
  ) => void
  showDraftBtn?: boolean
}

export const PreviewImgScreen = ({
  addImgBtnText,
  children,
  errorSizeText,
  errorText,
  maxImgSize,
  multipleInput,
  onDraftBtnClick,
  onEditMode,
  openDraftBtnText,
  setErrorText,
  setImage,
  showDraftBtn = false,
}: IProps) => {
  return (
    <div className={s.wrapper}>
      {errorText && (
        <div className={s.errorWrapper}>
          <Typography variant={'regular-text-14'}>{errorText}</Typography>
        </div>
      )}
      {children}
      <div className={s.buttonsWrapper}>
        <DownloadFile
          btnText={addImgBtnText}
          errorSizeText={errorSizeText}
          maxImgSize={maxImgSize}
          multiple={multipleInput}
          onEditMode={onEditMode}
          setError={setErrorText}
          setImage={setImage}
        />
        {showDraftBtn && (
          <Button onClick={onDraftBtnClick} type={'button'} variant={'outline'}>
            {openDraftBtnText}
          </Button>
        )}
      </div>
    </div>
  )
}
