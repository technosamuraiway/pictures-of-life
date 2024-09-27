import { SessionCard } from '@/entities/profile/settings/Sessions/SessionCard'
import { useRetrieveSessionsQuery } from '@/services'
import { RequestLineLoader, findIcon, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './Devices.module.scss'

import { ActiveSessions } from './activeSessions/ActiveSessions'

export const Devices = () => {
  const t = useRouterLocaleDefinition()
  const { data, isLoading } = useRetrieveSessionsQuery()
  const currentIcon = findIcon(data?.current?.browserName, 'browser')

  return (
    <div>
      {isLoading ? (
        <RequestLineLoader />
      ) : (
        <div>
          <Typography className={s.text} variant={'h3'}>
            {t.settingsPage.devices.tabHeader}
          </Typography>
          <SessionCard
            currentIcon={currentIcon}
            ip={data?.current.ip}
            tittle={data?.current.browserName}
          />
          <ActiveSessions />
        </div>
      )}
    </div>
  )
}
