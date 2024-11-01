import { useState } from 'react'

import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { Dropdown } from '@technosamurai/techno-ui-kit'

export const PostModalHeaderDropdownDotsMenu = () => {
  const [isOpen, setIsOPen] = useState(false)

  return (
    <Dropdown.Root
      onOpenChange={setIsOPen}
      open={isOpen}
      trigger={<DropdownDotsIcon />}
      withArrow={false}
    >
      <Dropdown.Item>Edit Post</Dropdown.Item>
      <Dropdown.Item>Delete Post</Dropdown.Item>
    </Dropdown.Root>
  )
}
