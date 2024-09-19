import { ChangeEvent, useRef, useState } from 'react'
import Avatar from 'react-avatar-editor'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'

import { AvatarEditor } from './avatarEditor/AvatarEditor'
import { BeforeEditor } from './beforeEditor/BeforeEditor'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ в байтах
const SCALE_STEP = 0.1
const SCALE_MAX = 2
const SCALE_MIN = 1

export function AvatarEditorComponent() {
  const t = useRouterLocaleDefinition()
  const [show, setShow] = useState<boolean>(true)
  const [image, setImage] = useState<File | string>('')
  const [scale, setScale] = useState<number>(1)
  const editorRef = useRef<Avatar | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<null | string>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onPositiveScaleClickHandler = () => {
    if (scale < SCALE_MAX) {
      setScale(scale => scale + SCALE_STEP)
    }
  }

  const onNegativeScaleClickHandler = () => {
    if (scale > SCALE_MIN) {
      setScale(scale => scale - SCALE_STEP)
    }
  }

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

  return show ? (
    <BeforeEditor
      errorText={fileError}
      imageAvatar={image}
      onChangeFileImg={handleFileChange}
      onClickAddAvatar={handleButtonClick}
      ref={fileInputRef}
    />
  ) : (
    image && !fileError && (
      <AvatarEditor
        downloadFileRef={fileInputRef}
        image={image}
        onAddNewBtnClick={handleButtonClick}
        onAddNewFile={handleFileChange}
        onNegativeScaleClick={onNegativeScaleClickHandler}
        onPositiveScaleClick={onPositiveScaleClickHandler}
        onSaveBtnClick={handleSave}
        onScaleChange={handleScaleChange}
        ref={editorRef}
        scale={scale}
        scaleMax={SCALE_MAX}
        scaleMin={SCALE_MIN}
        scaleStep={SCALE_STEP}
      />
    )
  )
}
