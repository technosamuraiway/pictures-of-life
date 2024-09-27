import { ChangeEvent, ComponentPropsWithoutRef, useRef } from 'react'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'
import { Button, ButtonVariant } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './DownloadFile.module.scss'

interface IProps extends ComponentPropsWithoutRef<'input'> {
  btnCN?: string
  btnText: string
  btnVariant?: ButtonVariant
  errorSizeText: string
  inputCN?: string
  isDisabledBtn?: boolean
  maxImgSize: number
  onEditMode?: (edit: boolean) => void
  setError: (error: null | string) => void
  setImage: (img: (File | string)[]) => void
}

export const DownloadFile = ({
  btnCN,
  btnText,
  btnVariant = 'primary',
  errorSizeText,
  inputCN,
  isDisabledBtn,
  maxImgSize,
  onEditMode,
  setError,
  setImage,
  ...rest
}: IProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useRouterLocaleDefinition()

  const onButtonClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    const validFiles = files.filter(file => {
      if (file.size > maxImgSize) {
        setError(errorSizeText)
        toast.error(errorSizeText)

        return false
      }
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        setError(t.avatarChange.errorFormatText)
        toast.error(t.avatarChange.errorFormatText)

        return false
      }

      return true
    })

    if (validFiles.length > 0) {
      onEditMode && onEditMode(true)
      const imageUrls = validFiles.map(file => URL.createObjectURL(file))

      setImage(imageUrls)
      setError(null)
    }
  }

  return (
    <>
      <Button
        className={clsx(s.button, btnCN)}
        disabled={isDisabledBtn}
        onClick={onButtonClickHandler}
        variant={btnVariant}
      >
        {btnText}
      </Button>
      <input
        {...rest}
        accept={'image/png, image/jpeg'}
        className={clsx(s.inputFile, inputCN)}
        onChange={onChangeFileHandler}
        ref={fileInputRef}
        type={'file'}
      />
    </>
  )
}
