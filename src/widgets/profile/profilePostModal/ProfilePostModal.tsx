import { memo } from 'react'

import { Modal } from '@technosamurai/techno-ui-kit'

type Props = {
  isModalOpen: boolean
  setModalOpen: (isModalOpen: boolean) => void
}

export const ProfilePostModal = memo(({ isModalOpen, setModalOpen }: Props) => {
  return (
    <Modal modalSize={'XL'} onOpenChange={setModalOpen} open={isModalOpen} showHeader={false}>
      123
    </Modal>
  )
})
