import { useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'

import { AvatarEditorComponent } from './avatarEditorComponent/AvatarEditorComponent'

interface IProps {
  onOpenModal: (open: boolean) => void
  openModal: boolean
}

export const AddProfilePhotoModal = ({ onOpenModal, openModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <Modal
      headerTitle={t.avatarChange.addAvatar.addAvatarModalHeader}
      modalSize={'M'}
      onOpenChange={onOpenModal}
      open={openModal}
    >
      <AvatarEditorComponent onOpenModal={onOpenModal} />
    </Modal>
  )
}
