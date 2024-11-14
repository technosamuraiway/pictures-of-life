import { useState } from 'react'
import { toast } from 'react-toastify'

import { useUnfollowByUserIdMutation } from '@/services/flow/followers.service'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { CopyLinkIcon, UnfollowIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PostModalHeaderDropdownDotsMenu.module.scss'

interface IProps {
  userName: string
}

export const PostModalHeaderDropdownDotsMenu = ({ userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()
  const { userId } = query
  const [isOpen, setIsOPen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowByUserIdMutation()

  function unfollowHandler() {
    setIsConfirmationModalOpen(true)
  }

  function copyLinkHandler() {
    const currentUrl = window.location.href

    navigator.clipboard.writeText(currentUrl)

    toast.success(t.profile.modal.headerDropdownDotsMenu.successLinkCopied)
  }

  async function unfollowRequestHandler() {
    if (!userId) {
      return
    }

    try {
      await unfollow({ userId: Number(userId) }).unwrap()
      toast.success(t.profile.modal.headerDropdownDotsMenu.unfollowSuccess)
    } catch (error) {
      toast.error(t.profile.modal.headerDropdownDotsMenu.unfollowError)
    }
  }

  const headerTitle =
    t.profile.modal.headerDropdownDotsMenu.unfollowConfirmation + ' ' + userName + '?'

  return (
    <>
      {isLoadingUnfollow && <RequestLineLoader />}

      <Dropdown.Root
        contentCN={s.root}
        onOpenChange={setIsOPen}
        open={isOpen}
        trigger={<DropdownDotsIcon />}
        withArrow={false}
      >
        <Dropdown.Item className={s.item} onClick={unfollowHandler}>
          <UnfollowIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownDotsMenu.unfollow}
          </Typography>
        </Dropdown.Item>
        <Dropdown.Item className={s.item} onClick={copyLinkHandler}>
          <CopyLinkIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownDotsMenu.copyLink}
          </Typography>
        </Dropdown.Item>
      </Dropdown.Root>

      <ConfirmationModal
        cbOnConfirm={unfollowRequestHandler}
        confirmMessage={headerTitle}
        headerTitle={t.profile.modal.headerDropdownDotsMenu.unfollowModalTitle}
        onOpenChange={setIsConfirmationModalOpen}
        open={isConfirmationModalOpen}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
}
