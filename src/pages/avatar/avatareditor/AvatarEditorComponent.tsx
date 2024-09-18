import React, { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from '@/pages/avatar/avatartest/AvatarTestComponent.module.scss'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ в байтах

function AvatarEditorComponent() {
  const t = useRouterLocaleDefinition()
  const [show, setShow] = useState<boolean>(true)
  const [image, setImage] = useState<File | string>('')
  const [scale, setScale] = useState<number>(1)
  const editorRef = useRef<AvatarEditor | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [error, setError] = useState<null | string>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('Размер файла превышает 10 МБ. Пожалуйста, выберите файл меньшего размера.')

        return
      }

      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setShow(false)
        const imageUrl = URL.createObjectURL(file)

        setImage(imageUrl)
        setError(null)
      } else {
        setError('Пожалуйста, выберите файл PNG или JPEG.')
      }
    }
  }

  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value)

    setScale(newScale)
  }

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const fileType = 'image/png'
          const fileName = fileType === 'image/png' ? 'avatar.png' : 'avatar.jpg'
          const file = new File([blob], fileName, { type: fileType })

          setAvatarFile(file)
        }
      }, 'image/png')
    }
  }

  const errorType = true
  const modalErrorText = errorType ? t.avatarChange.errorFormatText : t.avatarChange.errorSizeText

  return (
    <>
      {show ? (
        <div className={s.addAvatarModalWrapper}>
          <div className={s.errorWrapper}>
            <Typography variant={'regular-text-14'}>
              <AdaptiveTranslation
                tags={{
                  1: () => (
                    <Typography as={'span'} className={s.errorText} variant={'bold-text-14'}>
                      {t.avatarChange.errorText}
                    </Typography>
                  ),
                }}
                text={modalErrorText}
              />
            </Typography>
          </div>
          <div className={s.addAvatarImgWrapper}>
            <Image
              alt={t.avatarChange.avatarImgAltText}
              className={s.avatarImg}
              src={image || emptyAvatar}
            />
          </div>
          <Button className={s.addAvatarButton} onClick={handleButtonClick} variant={'primary'}>
            {t.avatarChange.addAvatarModalButtonText}
          </Button>
          <input
            accept={'image/png, image/jpeg'}
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
        </div>
      ) : (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {image && !error && (
            <div>
              <AvatarEditor
                border={50}
                borderRadius={250}
                height={250}
                image={image}
                ref={editorRef}
                scale={scale}
                width={250}
              />
              <input
                defaultValue={'1'}
                max={'2'}
                min={'1'}
                onChange={handleScaleChange}
                step={'0.01'}
                type={'range'}
              />
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

AvatarEditorComponent.getLayout = getLayoutWithNav
export default AvatarEditorComponent
