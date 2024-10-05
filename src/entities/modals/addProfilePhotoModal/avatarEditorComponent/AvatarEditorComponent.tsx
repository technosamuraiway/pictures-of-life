import { useRef, useState } from 'react'
import Avatar from 'react-avatar-editor'
import { toast } from 'react-toastify'

import { useChangeAvatarMutation } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'

import { AvatarEditor } from './avatarEditor/AvatarEditor'
import { BeforeEditor } from './beforeEditor/BeforeEditor'

interface IProps {
  onOpenModal: (open: boolean) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ в байтах

export const AvatarEditorComponent = ({ onOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [changeAvatar, { isLoading: changeAvatarIsLoading }] = useChangeAvatarMutation()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [image, setImage] = useState<string[]>([])

  const editorRef = useRef<Avatar | null>(null)

  const [fileError, setFileError] = useState<null | string>(null)

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

  return (
    <>
      {changeAvatarIsLoading && <RequestLineLoader />}
      {isEdit ? (
        image && (
          <AvatarEditor
            image={image}
            isDisableSaveBtn={changeAvatarIsLoading}
            maxImgSize={MAX_FILE_SIZE}
            onSaveBtnClick={onAvatarSaveHandler}
            ref={editorRef}
            setErrorText={setFileError}
            setImage={setImage}
          />
        )
      ) : (
        <BeforeEditor
          errorText={fileError}
          maxImgSize={MAX_FILE_SIZE}
          onEditMode={setIsEdit}
          setErrorText={setFileError}
          setImage={setImage}
        />
      )}
    </>
  )
}
