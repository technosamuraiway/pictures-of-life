import { useState } from 'react'

import { BlockedIcon } from '@public/icons/BlockedIcon'
import { MoreHorizontalIcon } from '@public/icons/MoreHorizontalOutlineIcon'
import { PersonRemoveOutlineIcon } from '@public/icons/PersonRemoveOutlineIcon'
import { Dropdown, Tables, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

import s from './TableCellMoreHorizontalIcon.module.scss'
const actionsPopover = [
  {
    icon: <PersonRemoveOutlineIcon />,
    text: 'Delete User',
  },
  {
    icon: <BlockedIcon />,
    text: 'Ban in the system',
  },
  {
    icon: <MoreHorizontalIcon />,
    text: 'More Information',
  },
]

export const TableCellMoreHorizontalIcon = () => {
  const [openPopover, setOpenPopover] = useState(false)

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
        // triggerTitle={t.createNewPost.editPhotoModal.ratioChange}
        withArrow={false}
      >
        {/*<Dropdown.Item className={s.itemDropdown}>*/}
        {/*  <BlockedIcon />*/}
        {/*  Delete User*/}
        {/*</Dropdown.Item>*/}
        {/*<Dropdown.Item>Ban in the system</Dropdown.Item>*/}
        {/*<Dropdown.Item>More Information</Dropdown.Item>*/}

        {actionsPopover.map(item => (
          <Dropdown.Item className={s.itemDropdown} key={uuid()}>
            {item.icon}
            <Typography variant={'regular-text-16'}>{item.text}</Typography>
          </Dropdown.Item>
        ))}
      </Dropdown.Root>
    </Tables.TableBodyCell>
  )
}
