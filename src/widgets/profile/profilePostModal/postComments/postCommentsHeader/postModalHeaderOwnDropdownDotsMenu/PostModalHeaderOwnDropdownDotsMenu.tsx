import { RequestLineLoader } from '@/shared'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { DeleteIcon, EditIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'

import s from '../postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu.module.scss'

import { useHeaderOwnDropdownDotsMenu } from './useHeaderOwnDropdownDotsMenu'

export const PostModalHeaderOwnDropdownDotsMenu = () => {
  const {
    deletePostRequestHandler,
    isConfirmationModalOpen,
    isLoading,
    isOpen,
    openEditModal,
    setIsConfirmationModalOpen,
    setIsOPen,
    t,
  } = useHeaderOwnDropdownDotsMenu()

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <Dropdown.Root
        contentCN={s.root}
        onOpenChange={setIsOPen}
        open={isOpen}
        trigger={<DropdownDotsIcon />}
        withArrow={false}
      >
        <Dropdown.Item className={s.item} onClick={openEditModal}>
          <EditIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownOwnDotsMenu.edit}
          </Typography>
        </Dropdown.Item>
        <Dropdown.Item className={s.item} onClick={() => setIsConfirmationModalOpen(true)}>
          <DeleteIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownOwnDotsMenu.delete}
          </Typography>
        </Dropdown.Item>
      </Dropdown.Root>

      <ConfirmationModal
        cbOnConfirm={deletePostRequestHandler}
        confirmMessage={t.profile.modal.headerDropdownOwnDotsMenu.deleteConfirmation}
        headerTitle={t.profile.modal.headerDropdownOwnDotsMenu.deleteModalTitle}
        onOpenChange={setIsConfirmationModalOpen}
        open={isConfirmationModalOpen}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
}
