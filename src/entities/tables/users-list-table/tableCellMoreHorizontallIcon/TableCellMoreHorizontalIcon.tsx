import { useState } from 'react'
import { toast } from 'react-toastify'

import { BanUnbanUserModal } from '@/entities/modals/banUnbanUserModal/BanUnbanUserModal'
import { DeleteUserModal } from '@/entities/modals/deleteUserModal/DeleteUserModal'
import { User } from '@/services/graphql/codegen/graphql'
import { BAN_USER, REMOVE_USER, UNBAN_USER } from '@/services/graphql/mutations/user'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useMutation } from '@apollo/client'
import { BlockedIcon } from '@public/icons/BlockedIcon'
import { MoreHorizontalIcon } from '@public/icons/MoreHorizontalOutlineIcon'
import { PersonRemoveOutlineIcon } from '@public/icons/PersonRemoveOutlineIcon'
import { Dropdown, Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BUN_REASON_TYPE } from 'src/shared/enums'
import { v4 as uuid } from 'uuid'

import s from './TableCellMoreHorizontalIcon.module.scss'

interface IProps {
  refetch: Function
  user: User
}

export const TableCellMoreHorizontalIcon = ({ refetch, user }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()
  const [openPopover, setOpenPopover] = useState(false)
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)
  const [openBanUnbanUserModal, setOpenBanUnbanUserModal] = useState(false)

  const [removeUser] = useMutation(REMOVE_USER)
  const [banUser] = useMutation(BAN_USER)
  const [unbanUser] = useMutation(UNBAN_USER)

  const handleRemoveUser = async (userId: number) => {
    try {
      await removeUser({
        variables: {
          userId,
        },
      })

      refetch()
    } catch (err: any) {
      toast.error(t.admin.usersList.errorRemoveUser)
    }
  }
  const handleBanUnbanUser = async (userId: number, banReason: BUN_REASON_TYPE) => {
    try {
      if (user?.userBan) {
        await unbanUser({
          variables: {
            userId,
          },
        })
      } else {
        await banUser({
          variables: {
            banReason,
            userId,
          },
        })
      }
      setOpenBanUnbanUserModal(false)
      refetch()
    } catch (err: any) {
      toast.error(t.admin.usersList.errorBanUnbanUser)
    }
  }
  const actionsPopover = [
    {
      action: () => setOpenDeleteUserModal(true),
      icon: <PersonRemoveOutlineIcon />,
      text: t.admin.usersList.deleteUser,
    },
    {
      action: () => setOpenBanUnbanUserModal(true),
      icon: <BlockedIcon />,
      text: user.userBan ? t.admin.usersList.unbanInTheSystem : t.admin.usersList.banInTheSystem,
    },
    {
      action: () => push(`${PATH.ADMIN.USERLIST}/${user.id}`),
      icon: <MoreHorizontalIcon />,
      text: t.admin.usersList.moreInformation,
    },
  ]
  const onClickPositiveButton = (banReason: BUN_REASON_TYPE) => {
    handleBanUnbanUser(user.id, banReason)
  }

  return (
    <>
      <Tables.TableBodyCell className={s.wrapper}>
        <Dropdown.Root
          contentAlign={'end'}
          contentCN={s.dropdownContent}
          contentSide={'bottom'}
          onOpenChange={setOpenPopover}
          open={openPopover}
          trigger={
            <MoreHorizontalIcon
              className={clsx(
                s.triggerIcon,
                openPopover ? s.activeTriggerIcon : s.defaultTriggerIcon
              )}
            />
          }
          triggerCN={s.triggerBtn}
          withArrow={false}
        >
          {actionsPopover.map(item => (
            <Dropdown.Item
              className={s.itemDropdown}
              key={uuid()}
              onClick={() => item.action && item.action()}
            >
              {item.icon}
              <Typography variant={'regular-text-16'}>{item.text}</Typography>
            </Dropdown.Item>
          ))}
        </Dropdown.Root>
      </Tables.TableBodyCell>
      <DeleteUserModal
        headerTitle={t.admin.usersList.deleteUser}
        isOpenModal={openDeleteUserModal}
        onClickNegativeButton={() => setOpenDeleteUserModal(false)}
        onClickPositiveButton={() => handleRemoveUser(user.id)}
        setIsOpenModal={setOpenDeleteUserModal}
        textContent={t.admin.usersList.confirmDeleteUser}
        user={user}
      />
      <BanUnbanUserModal
        headerTitle={user?.userBan ? t.admin.usersList.unbanUser : t.admin.usersList.banUser}
        isOpenModal={openBanUnbanUserModal}
        onClickNegativeButton={() => setOpenBanUnbanUserModal(false)}
        onClickPositiveButton={onClickPositiveButton}
        setIsOpenModal={setOpenBanUnbanUserModal}
        textContent={
          user?.userBan ? t.admin.usersList.confirmUnbanUser : t.admin.usersList.confirmBanUser
        }
        userBan={user.userBan}
        userName={user.userName}
      />
    </>
  )
}
