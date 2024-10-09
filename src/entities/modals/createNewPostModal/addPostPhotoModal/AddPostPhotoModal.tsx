import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

import { PATH, SquareImg, useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './AddPostPhotoModal.module.scss'

import { PreviewImgScreen } from '../../../components/previewImgScreen/PreviewImgScreen'

interface IProps {
  onEditMode: (edit: boolean) => void
  setImage: Dispatch<SetStateAction<string[]>>
}

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ в байтах

export const AddPostPhotoModal = ({ onEditMode, setImage }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()

  const [openAddPostPhoto, setOpenAddPostPhoto] = useState<boolean>(true)
  const [fileError, setFileError] = useState<null | string>(null)

  const modalHandler = () => {
    openAddPostPhoto ? push(PATH.HOME) : setOpenAddPostPhoto(true)
  }

  const onDraftBtnClickHandler = () => {
    toast.info('Здесь будет функционал черновиков, когда-нибудь точно!')
    push(PATH.HOME)
  }

  return (
    <Modal
      closeButtonClassName={s.closeButton}
      headerTitle={t.createNewPost.addPhotoModal.modalTitle}
      modalSize={'M'}
      onOpenChange={modalHandler}
      open={openAddPostPhoto}
    >
      <PreviewImgScreen
        addImgBtnText={t.createNewPost.addPhotoModal.addImgModalButtonText}
        errorSizeText={t.createNewPost.addPhotoModal.errorSizeText}
        errorText={fileError}
        maxImgSize={MAX_FILE_SIZE}
        multipleInput
        onDraftBtnClick={onDraftBtnClickHandler}
        onEditMode={onEditMode}
        openDraftBtnText={t.createNewPost.addPhotoModal.openDraftButtonText}
        setErrorText={setFileError}
        setImage={setImage}
        showDraftBtn
      >
        <SquareImg imgSVGWrapperCN={s.imgWrapper} />
      </PreviewImgScreen>
    </Modal>
  )
}
