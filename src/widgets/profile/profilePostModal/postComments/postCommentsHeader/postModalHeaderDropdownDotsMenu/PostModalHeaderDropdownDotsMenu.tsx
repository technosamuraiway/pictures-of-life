import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { CopyLinkIcon, UnfollowIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'

import s from './PostModalHeaderDropdownDotsMenu.module.scss'

export const PostModalHeaderDropdownDotsMenu = () => {
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
        <UnfollowIcon />
        <Typography variant={'regular-text-14'}>
          {t.profile.modal.headerDropdownDotsMenu.unfollow}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <CopyLinkIcon />
        <Typography variant={'regular-text-14'}>
          {t.profile.modal.headerDropdownDotsMenu.copyLink}
        </Typography>
      </Dropdown.Item>
    </Dropdown.Root>
  )
}
