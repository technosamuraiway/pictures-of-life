import { useState } from 'react'

import { NotificationItem } from '@/services/types/notifications.type'
import { useRouterLocaleDefinition } from '@/shared'
import { DefaultNotifications, Dropdown, Scrollbar, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './notificationsComponent.module.scss'

interface IProps {
  notifications: NotificationItem[]
}

export const NotificationsComponent = ({ notifications }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dropdown.Root
      // contentSide={contentSide}
      onOpenChange={setIsOpen}
      open={isOpen}
      trigger={<DefaultNotifications />}
      // avoidCollisions={avoidCollisions}
      triggerCN={clsx(s.trigger, isOpen && s.triggerHovered)}
      withArrow
    >
      <Dropdown.Item>
        <div className={s.root}>
          <Typography variant={'bold-text-16'}>{t.notifications.notifications}</Typography>
          <Scrollbar maxHeight={330}>123</Scrollbar>
        </div>
      </Dropdown.Item>
    </Dropdown.Root>
  )
}
