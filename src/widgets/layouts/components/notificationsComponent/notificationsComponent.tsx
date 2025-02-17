import { useEffect, useRef, useState } from 'react'

import {
  useDeleteNotificationMutation,
  useMarkAsReadMutation,
} from '@/services/flow/notofocations.service'
import { NotificationItem } from '@/services/types/notifications.type'
import { RequestLineLoader, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import {
  CloseIcon,
  DefaultNotifications,
  Scrollbar,
  Typography,
} from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './notificationsComponent.module.scss'

interface IProps {
  notifications: NotificationItem[]
}

export const NotificationsComponent = ({ notifications }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const [markAsRead, { isLoading: isMarkingAsRead }] = useMarkAsReadMutation()
  const [deleteNotification, { isLoading: isDeleting }] = useDeleteNotificationMutation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function notification(item: NotificationItem) {
    const { createdAt, id, isRead, message } = item

    function onMarkAsRedMessage() {
      markAsRead({ ids: [id] })
    }

    function onDeleteMessage() {
      deleteNotification(id)
    }

    return (
      <li className={s.item} key={id}>
        <div className={s.itemTitleContainer}>
          <Typography variant={'bold-text-14'}>{t.notifications.newNotification}</Typography>
          {!isRead && (
            <Typography className={s.itemNew} variant={'small-text'}>
              {t.notifications.new}
            </Typography>
          )}
        </div>
        <Typography variant={'regular-text-14'}>{message}</Typography>
        <Typography className={s.itemDate} variant={'small-text'}>
          {TimeAgo(String(createdAt), t)}
        </Typography>
        <div className={s.itemBtnWrapper}>
          <Typography
            as={'button'}
            className={s.itemBtnWrapperDeleteBtn}
            onClick={onDeleteMessage}
            variant={'small-text'}
          >
            {t.notifications.delete}
          </Typography>

          {!isRead && (
            <Typography
              as={'button'}
              className={s.itemBtnWrapperMarkAsReadBtn}
              onClick={onMarkAsRedMessage}
              variant={'small-text'}
            >
              {t.notifications.markAsRead}
            </Typography>
          )}
        </div>
      </li>
    )
  }

  const isLoading = isMarkingAsRead || isDeleting

  return (
    <>
      {isLoading && <RequestLineLoader />}

      <DefaultNotifications
        className={clsx(s.trigger, isOpen && s.triggerHovered)}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className={s.root} ref={rootRef}>
          <Typography className={s.title} variant={'bold-text-16'}>
            {t.notifications.notifications}
            <CloseIcon className={s.closeIcon} onClick={() => setIsOpen(false)} />
          </Typography>
          <Scrollbar maxHeight={420}>
            {notifications.length > 0 ? (
              <ul className={s.list}>{notifications.map(item => notification(item))}</ul>
            ) : (
              <Typography variant={'bold-text-14'}>{t.notifications.emptyList}</Typography>
            )}
          </Scrollbar>
        </div>
      )}
    </>
  )
}
