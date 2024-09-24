import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'

import { PostEditorComponent } from './postEditorComponent/PostEditorComponent'

interface IProps {
  onOpenModal: (open: boolean) => void
  openModal: boolean
}

export const CreateNewPostModal = ({ onOpenModal, openModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  const [openExitModal, setOpenExitModal] = useState(false)

  const modalHandler = () => {
    if (openModal) {
      setOpenExitModal(true)
      //   Добавить логику сохранить или нет
    } else {
      onOpenModal(true)
    }
  }

  return (
    <>
      <Modal
        headerTitle={t.createNewPost.modalTitle}
        modalSize={'M'}
        onOpenChange={modalHandler}
        open={openModal}
      >
        <PostEditorComponent onOpenModal={onOpenModal} />
      </Modal>
      {/* Добавить модалку которая откроется и будет спрашивать о сохранении, в случае успеха или неуспеха закроется*/}
    </>
  )
}
