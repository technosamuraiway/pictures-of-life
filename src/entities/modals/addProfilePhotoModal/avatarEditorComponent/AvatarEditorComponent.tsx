import { ChangeEvent, useRef, useState } from 'react'
import Avatar from 'react-avatar-editor'
import { toast } from 'react-toastify'

import { useChangeAvatarMutation } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'

import { AvatarEditor } from './avatarEditor/AvatarEditor'
import { BeforeEditor } from './beforeEditor/BeforeEditor'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ в байтах

interface IProps {
  onOpenModal: (open: boolean) => void
}

export const AvatarEditorComponent = ({ onOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [changeAvatar, { isLoading: changeAvatarIsLoading }] = useChangeAvatarMutation()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [image, setImage] = useState<File | string>('')

  const editorRef = useRef<Avatar | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileError, setFileError] = useState<null | string>(null)

  const onInputButtonClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onAvatarFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(t.avatarChange.errorSizeText)
        toast.error(t.avatarChange.errorSizeText)

        return
      }

      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setIsEdit(true)

        const imageUrl = URL.createObjectURL(file)

        setImage(imageUrl)
        setFileError(null)
      } else {
        setFileError(t.avatarChange.errorFormatText)
        toast.error(t.avatarChange.errorFormatText)
      }
    }
  }

  const onAvatarSaveHandler = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(async blob => {
        if (blob) {
          const fileType = 'image/png'
          const fileName = fileType === 'image/png' ? 'avatar.png' : 'avatar.jpg'
          const file = new File([blob], fileName, { type: fileType })

          await changeAvatar({ file }).unwrap()

          setIsEdit(false)
          onOpenModal(false)
          toast.success(t.avatarChange.avatarSaved)
        }
      }, 'image/png')
    }
  }

  return isEdit ? (
    <>
      {changeAvatarIsLoading && <RequestLineLoader />}
      {image && !fileError && (
        <AvatarEditor
          downloadFileRef={fileInputRef}
          image={image}
          isDisableSaveBtn={changeAvatarIsLoading}
          onAddNewBtnClick={onInputButtonClickHandler}
          onAddNewFile={onAvatarFileChangeHandler}
          onSaveBtnClick={onAvatarSaveHandler}
          ref={editorRef}
        />
      )}
    </>
  ) : (
    <BeforeEditor
      errorText={fileError}
      onChangeFileImg={onAvatarFileChangeHandler}
      onClickAddAvatar={onInputButtonClickHandler}
      ref={fileInputRef}
    />
  )
}
