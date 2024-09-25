import { useState } from 'react'
import { toast } from 'react-toastify'

import { PATH, SquareImg, useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './CreateNewPostModal.module.scss'

import { PreviewImgScreen } from '../../components/previewImgScreen/PreviewImgScreen'

interface IProps {
  onEditMode: (edit: boolean) => void
  onOpenModal: (open: boolean) => void
  openModal: boolean
}

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ в байтах

export const CreateNewPostModal = ({ onEditMode, onOpenModal, openModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [openExitModal, setOpenExitModal] = useState(false)

  const [fileError, setFileError] = useState<null | string>(null)
  const [image, setImage] = useState<(File | string)[]>([''])

  const modalHandler = () => {
    openModal ? push(PATH.HOME) : onOpenModal(true)
  }

  const onDraftBtnClickHandler = () => {
    toast.info('Здесь будет функционал черновиков, когда-нибудь точно!')
    push(PATH.HOME)
  }

  return (
    <>
      <Modal
        headerTitle={t.createNewPost.modalTitle}
        modalSize={'M'}
        onOpenChange={modalHandler}
        open={openModal}
      >
        <PreviewImgScreen
          addImgBtnText={t.createNewPost.addImgModalButtonText}
          errorSizeText={t.createNewPost.errorSizeText}
          errorText={fileError}
          maxImgSize={MAX_FILE_SIZE}
          multipleInput
          onDraftBtnClick={onDraftBtnClickHandler}
          onEditMode={setIsEdit}
          openDraftBtnText={t.createNewPost.openDraftButtonText}
          setErrorText={setFileError}
          setImage={setImage}
          showDraftBtn
        >
          <SquareImg imgSVGWrapperCN={s.imgWrapper} />
        </PreviewImgScreen>
      </Modal>
    </>
  )
}
