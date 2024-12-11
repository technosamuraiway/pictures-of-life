import { useState } from 'react'
import { toast } from 'react-toastify'

import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { RequestLineLoader, useFollowUnfollow, useRouterLocaleDefinition } from '@/shared'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { CopyLinkIcon, FollowIcon, UnfollowIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PostModalHeaderDropdownDotsMenu.module.scss'

interface IProps {
  copyUrl?: string
  isRedirect?: boolean
  userIdProp?: number
  userName: string
}

export const PostModalHeaderDropdownDotsMenu = ({
  copyUrl,
  isRedirect,
  userIdProp,
  userName,
}: IProps) => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()
  const { userId } = query
  const [isOpen, setIsOPen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const { followUserHandler, isLoadingFollowUnfollow, unfollowUserHandler } = useFollowUnfollow(
    userIdProp ?? Number(userId),
    userName,
    setIsConfirmationModalOpen
  )

  const { data: userByUserNameData } = useGetUserByUserNameQuery(String(userName))

  function unfollowHandler() {
    setIsConfirmationModalOpen(true)
  }

  function copyLinkHandler() {
    const currentUrl = window.location.href

    navigator.clipboard.writeText(copyUrl ? copyUrl : currentUrl)

    toast.success(t.profile.modal.headerDropdownDotsMenu.successLinkCopied)
  }

  const headerTitle =
    t.profile.modal.headerDropdownDotsMenu.unfollowConfirmation + ' ' + userName + '?'

  return (
    <>
      {isLoadingFollowUnfollow && <RequestLineLoader />}

      <Dropdown.Root
        contentCN={s.root}
        onOpenChange={setIsOPen}
        open={isOpen}
        trigger={<DropdownDotsIcon />}
        withArrow={false}
      >
        <Dropdown.Item
          className={s.item}
          onClick={userByUserNameData?.isFollowing ? unfollowHandler : followUserHandler}
        >
          {userByUserNameData?.isFollowing ? (
            <>
              <UnfollowIcon />
              <Typography variant={'regular-text-14'}>
                {t.profile.modal.headerDropdownDotsMenu.unfollow}
              </Typography>
            </>
          ) : (
            <>
              <FollowIcon height={24} width={24} />
              <Typography variant={'regular-text-14'}>
                {t.profile.modal.headerDropdownDotsMenu.follow}
              </Typography>
            </>
          )}
        </Dropdown.Item>
        <Dropdown.Item className={s.item} onClick={copyLinkHandler}>
          <CopyLinkIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownDotsMenu.copyLink}
          </Typography>
        </Dropdown.Item>
      </Dropdown.Root>

      <ConfirmationModal
        cbOnConfirm={unfollowUserHandler}
        confirmMessage={headerTitle}
        headerTitle={t.profile.modal.headerDropdownDotsMenu.unfollowModalTitle}
        isRedirect={isRedirect}
        onOpenChange={setIsConfirmationModalOpen}
        open={isConfirmationModalOpen}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
}
