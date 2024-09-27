import { toast } from 'react-toastify'

import {
  useDeleteSessionMutation,
  useDeleteSessionsGroupMutation,
  useRetrieveSessionsQuery,
} from '@/services'
import { findIcon, useRouterLocaleDefinition } from '@/shared'
import { convertDate } from '@/shared/utils/convertDate'
import { Button, LogOutIcon, Typography } from '@technosamurai/techno-ui-kit'

import s from '../Devices.module.scss'

import { SessionCard } from '../sessionCard/SessionCard'

export const ActiveSessions = () => {
  const t = useRouterLocaleDefinition()
  const [deleteDevice] = useDeleteSessionMutation()
  const [deleteDeviceGroup] = useDeleteSessionsGroupMutation()
  const { data } = useRetrieveSessionsQuery()
  const deleteDeviceHandler = (deviceId: number) => {
    if (deviceId) {
      deleteDevice(deviceId)
        .unwrap()
        .then(() => {
          toast.success(t.settingsPage.devices.deleteSessionMessage)
        })
    }
  }
  const deleteDeviceGroupHandler = () => {
    deleteDeviceGroup()
      .unwrap()
      .then(() => {
        toast.success(t.settingsPage.devices.deleteSessionsMessage)
      })
  }

  return (
    <div>
      {(data?.others?.length || 0) > 1 && (
        <div className={s.buttonContainer}>
          <Button onClick={deleteDeviceGroupHandler} variant={'outline'}>
            {t.settingsPage.devices.terminateButton}
          </Button>
        </div>
      )}
      <Typography className={s.text} variant={'h3'}>
        {t.settingsPage.devices.activeSessions}
      </Typography>
      {(data?.others?.length || 0) > 1 ? (
        <div>
          {data?.others?.map(device => {
            if (device.deviceId === data.current.deviceId) {
              return null
            }
            const currentIcon = findIcon(device.osName, 'device')
            const date = convertDate(device.lastActive)

            return (
              <SessionCard
                currentIcon={currentIcon}
                date={date}
                ip={device.ip}
                key={device.deviceId}
                tittle={device.osName}
              >
                {' '}
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
              </SessionCard>
            )
          })}
        </div>
      ) : (
        <div className={s.noOtherSessionsContainer}>
          <Typography className={s.text} variant={'h1'}>
            {t.settingsPage.devices.noOtherSessionsText}
          </Typography>
        </div>
      )}
    </div>
  )
}
