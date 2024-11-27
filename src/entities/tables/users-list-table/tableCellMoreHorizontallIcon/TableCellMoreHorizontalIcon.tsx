import { useState } from 'react'
import { toast } from 'react-toastify'

import { User } from '@/services/graphql/codegen/graphql'
import { REMOVE_USER } from '@/services/graphql/mutations/user'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useMutation } from '@apollo/client'
import { BlockedIcon } from '@public/icons/BlockedIcon'
import { MoreHorizontalIcon } from '@public/icons/MoreHorizontalOutlineIcon'
import { PersonRemoveOutlineIcon } from '@public/icons/PersonRemoveOutlineIcon'
import { Dropdown, Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'
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

  const [removeUser] = useMutation(REMOVE_USER)

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
  const actionsPopover = [
    {
      action: (userId: number) => handleRemoveUser(userId),
      icon: <PersonRemoveOutlineIcon />,
      text: t.admin.usersList.deleteUser,
    },
    {
      icon: <BlockedIcon />,
      text: t.admin.usersList.banInTheSystem,
    },
    {
      action: (userId: number) => push(`${PATH.ADMIN.USERLIST}/${userId}`),
      icon: <MoreHorizontalIcon />,
      text: t.admin.usersList.moreInformation,
    },
  ]

  return (
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
            onClick={() => item.action && item.action(user.id)}
          >
            {item.icon}
            <Typography variant={'regular-text-16'}>{item.text}</Typography>
          </Dropdown.Item>
        ))}
      </Dropdown.Root>
    </Tables.TableBodyCell>
  )
}
