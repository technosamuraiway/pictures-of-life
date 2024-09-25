import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { BeforeEditor } from '@/entities/modals/addProfilePhotoModal/avatarEditorComponent/beforeEditor/BeforeEditor'
import { AvatarChoice, DownloadFile, PATH, useRouterLocaleDefinition } from '@/shared'
import emptyAvatar from '@public/profileAvatar/emptyAvatar.svg'
import { Modal, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from '@/entities/modals/addProfilePhotoModal/avatarEditorComponent/beforeEditor/BeforeEditor.module.scss'

import { PostEditorComponent } from './postEditorComponent/PostEditorComponent'

interface IProps {
  onEditMode: (edit: boolean) => void
  onOpenModal: (open: boolean) => void
  openModal: boolean
}

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ в байтах

export const CreateNewPostModal = ({ onEditMode, onOpenModal, openModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()

  const [openExitModal, setOpenExitModal] = useState(false)

  const [fileError, setFileError] = useState<null | string>(null)
  const [image, setImage] = useState<File | string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onInputButtonClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onAvatarFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(t.createNewPost.errorSizeText)
        toast.error(t.createNewPost.errorSizeText)

        return
      }

      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        onEditMode(true)

        const imageUrl = URL.createObjectURL(file)

        setImage(imageUrl)
        setFileError(null)
      } else {
        setFileError(t.createNewPost.errorFormatText)
        toast.error(t.createNewPost.errorFormatText)
      }
    }
  }

  const modalHandler = () => {
    openModal ? push(PATH.HOME) : onOpenModal(true)
  }

  return (
    <>
      <Modal
        headerTitle={t.createNewPost.modalTitle}
        modalSize={'M'}
        onOpenChange={modalHandler}
        open={openModal}
      >
        <div className={s.wrapper}>
          {fileError && (
            <div className={s.errorWrapper}>
              <Typography variant={'regular-text-14'}>{fileError}</Typography>
            </div>
          )}
          <div className={clsx(s.imgWrapper)}>
            <Image alt={`Empty post`} className={clsx(s.postImgSvg)} src={emptyAvatar} />
          </div>
          <DownloadFile
            btnText={t.avatarChange.addAvatarModalButtonText}
            multiple
            onBtnClick={onInputButtonClickHandler}
            onChangeFile={onAvatarFileChangeHandler}
            ref={fileInputRef}
          />
        </div>
      </Modal>
    </>
  )
}
