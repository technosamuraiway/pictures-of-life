import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { DeleteIcon, EditIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'

import s from '../postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu.module.scss'

export const PostModalHeaderOwnDropdownDotsMenu = () => {
  const t = useRouterLocaleDefinition()
  const [isOpen, setIsOPen] = useState(false)

  return (
    <Dropdown.Root
      contentCN={s.root}
      onOpenChange={setIsOPen}
      open={isOpen}
      trigger={<DropdownDotsIcon />}
      withArrow={false}
    >
      <Dropdown.Item className={s.item}>
        <EditIcon />
        <Typography variant={'regular-text-14'}>
          {t.profile.modal.headerDropdownOwnDotsMenu.edit}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <DeleteIcon />
        <Typography variant={'regular-text-14'}>
          {t.profile.modal.headerDropdownOwnDotsMenu.delete}
        </Typography>
      </Dropdown.Item>
    </Dropdown.Root>
  )
}
