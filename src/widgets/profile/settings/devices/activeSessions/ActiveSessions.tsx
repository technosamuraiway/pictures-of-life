import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  useDeleteSessionMutation,
  useDeleteSessionsGroupMutation,
} from '@/services/flow/sessions.service'
import { ISessionList } from '@/services/types/sessions.types'
import { useRouterLocaleDefinition } from '@/shared'
import { convertDate } from '@/shared/utils/convertData'
import { findIcon } from '@/shared/utils/findIcon'
import { Button, Card, LogOutIcon, Typography } from '@technosamurai/techno-ui-kit'

import s from '../Devices.module.scss'

export const ActiveSessions: FC<{ data?: ISessionList }> = ({ data }) => {
  const t = useRouterLocaleDefinition()
  const [isOtherActiveSessions, setIsOtherActiveSessions] = useState<boolean>(
    (data?.others?.length ?? 0) > 1
  )
  const [deleteDevice] = useDeleteSessionMutation()
  const [deleteDeviceGroup] = useDeleteSessionsGroupMutation()

  const deleteDeviceHandler = (deviceId: number) => {
    if (deviceId) {
      deleteDevice(deviceId)
        .unwrap()
        .then(() => {
          toast.success(t.settingsPage.devices.deleteSessionMessage)
        })
        .catch(err => {
          toast.error(err.data.error)
        })
    }
  }
  const deleteDeviceGroupHandler = () => {
    deleteDeviceGroup()
      .unwrap()
      .then(() => {
        toast.success(t.settingsPage.devices.deleteSessionsMessage)
      })
      .catch(err => {
        toast.error(err.data.error)
      })
  }

  useEffect(() => {
    setIsOtherActiveSessions((data?.others?.length || 0) > 1)
  }, [data])

  return (
    <div>
      {isOtherActiveSessions && (
        <div className={s.buttonContainer}>
          <Button onClick={deleteDeviceGroupHandler} variant={'outline'}>
            {t.settingsPage.devices.terminateButton}
          </Button>
        </div>
      )}
      <Typography className={s.text} variant={'h3'}>
        {t.settingsPage.devices.activeSessions}
      </Typography>
      {data?.others?.map(device => {
        if (device.deviceId === data.current.deviceId) {
          return null
        }
        const currentIcon = findIcon(device.browserName)
        const date = convertDate(device.lastActive)

        return (
          <Card className={s.card} key={device.deviceId}>
            <div className={s.cardInWrapper}>
              {currentIcon}
              <div className={s.cardDescription}>
                <Typography variant={'bold-text-16'}>{device.osName}</Typography>
                <Typography variant={'regular-text-14'}>IP: {device.ip}</Typography>
                <Typography variant={'small-text'}>
                  {`${t.settingsPage.devices.lastVisit}: ${date}`}
                </Typography>
              </div>
            </div>
            <Button
              className={s.logOutButton}
              onClick={() => {
                deleteDeviceHandler(device.deviceId)
              }}
              variant={'iconButton'}
            >
              <span className={s.logOutIcon}>
                <LogOutIcon />
              </span>
              <Typography variant={'medium-text-14'}>
                {t.settingsPage.devices.logOutButton}
              </Typography>
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
