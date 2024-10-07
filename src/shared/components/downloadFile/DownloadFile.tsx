import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from 'react'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'
import { Button, ButtonVariant } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './DownloadFile.module.scss'

interface IProps extends ComponentPropsWithoutRef<'input'> {
  btnCN?: string
  btnText?: ReactNode
  btnVariant?: ButtonVariant
  errorSizeText: string
  inputCN?: string
  isDisabledBtn?: boolean
  maxImgSize: number
  onEditMode?: (edit: boolean) => void
  setError?: (error: null | string) => void
  setImage: Dispatch<SetStateAction<string[]>>
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
  setError = () => {},
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
        setError(t.avatarChange.errors.errorFormatText)
        toast.error(t.avatarChange.errors.errorFormatText)

        return false
      }

      return true
    })

    if (validFiles.length > 10) {
      setError(t.createNewPost.addPhotoModal.errorMaxCount)
      toast.error(t.createNewPost.addPhotoModal.errorMaxCount)

      return
    }

    if (validFiles.length) {
      onEditMode && onEditMode(true)
      const imageUrls = validFiles.map(file => URL.createObjectURL(file))

      setImage(prevImages => {
        if (prevImages.length === 0) {
          return imageUrls
        } else {
          return [...imageUrls, ...prevImages]
        }
      })
      setError(null)
    }
  }

  return (
    <>
      <Button
        className={clsx(s.button, btnCN)}
        disabled={isDisabledBtn}
        onClick={onButtonClickHandler}
        type={'button'}
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
