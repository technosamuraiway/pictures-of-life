import { useState } from 'react'
import { toast } from 'react-toastify'

import { BanUnbanUserModal } from '@/entities'
import { BAN_USER } from '@/services/graphql/mutations/user'
import { BUN_REASON_TYPE, PATH, PostOwner, useRouterLocaleDefinition } from '@/shared'
import { useMutation } from '@apollo/client'
import { BlockedIcon } from '@public/icons/BlockedIcon'
import noAvatar from '@public/profileAvatar/no-avatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './AdminOwnerPost.module.scss'

interface IProps {
  postOwner: PostOwner
}

export const AdminOwnerPost = ({ postOwner }: IProps) => {
  const { push } = useRouter()
  const t = useRouterLocaleDefinition()

  const [openBanUserModal, setOpenBanModal] = useState(false)

  const [banUser] = useMutation(BAN_USER)

  const redirectToUserProfileHandler = () => {
    push(`${PATH.ADMIN.USERLIST}/${postOwner.id}`)
  }

  const banUserHandler = async (banReason: BUN_REASON_TYPE) => {
    if (postOwner.id) {
      await banUser({
        variables: {
          banReason,
          userId: postOwner.id,
        },
      })

      setOpenBanModal(false)
      toast.success(t.admin.postsList.banUser)
    }
  }

  const avatarSrc = (postOwner?.avatars && postOwner?.avatars[1]?.url) || noAvatar

  return (
    <>
      <div className={s.wrapper}>
        <Image
          alt={`${postOwner?.userName} avatar`}
          className={clsx(s.avatarImg, s.hover)}
          height={36}
          onClick={redirectToUserProfileHandler}
          priority
          src={avatarSrc}
          width={36}
        />
        <Typography
          as={'h3'}
          className={clsx(s.userName, s.hover)}
          onClick={redirectToUserProfileHandler}
          variant={'h3'}
        >
          {postOwner?.userName}
        </Typography>
        <BlockedIcon
          className={s.hover}
          height={24}
          onClick={() => setOpenBanModal(true)}
          width={24}
        />
      </div>
      <BanUnbanUserModal
        headerTitle={t.admin.usersList.banUser}
        isOpenModal={openBanUserModal}
        onClickNegativeButton={() => setOpenBanModal(false)}
        onClickPositiveButton={banUserHandler}
        setIsOpenModal={setOpenBanModal}
        textContent={t.admin.usersList.confirmBanUser}
        userName={postOwner?.userName}
      />
    </>
  )
}
