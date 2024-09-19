import React, { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { toast } from 'react-toastify'

import { BeforeEditor } from '@/entities/modals/addProfilePhotoModal/beforeEditor/BeforeEditor'
import { AdaptiveTranslation, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from '@/entities/modals/addProfilePhotoModal/AddProfilePhotoModal.module.scss'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ в байтах

function AvatarEditorComponent() {
  const t = useRouterLocaleDefinition()
  const [show, setShow] = useState<boolean>(true)
  const [image, setImage] = useState<File | string>('')
  const [scale, setScale] = useState<number>(1)
  const editorRef = useRef<AvatarEditor | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<null | string>(t.avatarChange.errorFormatText)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(t.avatarChange.errorSizeText)
        toast.error(t.avatarChange.errorSizeText)

        return
      }

      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setShow(false)
        const imageUrl = URL.createObjectURL(file)

        setImage(imageUrl)
        setFileError(null)
      } else {
        setFileError(t.avatarChange.errorFormatText)
        toast.error(t.avatarChange.errorFormatText)
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
        <BeforeEditor
          errorText={fileError}
          imageAvatar={image}
          onChangeFileImg={handleFileChange}
          onClickAddAvatar={handleButtonClick}
          ref={fileInputRef}
        />
      ) : (
        <div>
          {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
          {image && !fileError && (
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
