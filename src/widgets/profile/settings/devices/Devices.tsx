import { useRetrieveSessionsQuery } from '@/services/flow/sessions.service'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { findIcon } from '@/shared/utils/findIcon'
import { ActiveSessions } from '@/widgets/profile/settings/devices/activeSessions/ActiveSessions'
import { Card, Typography } from '@technosamurai/techno-ui-kit'

import s from './Devices.module.scss'

export const Devices = () => {
  const t = useRouterLocaleDefinition()
  const { data, isLoading } = useRetrieveSessionsQuery()
  const currentIcon = findIcon(data?.current?.browserName)

  return (
    <div>
      {isLoading ? (
        <RequestLineLoader />
      ) : (
        <div>
          <Typography className={s.text} variant={'h3'}>
            {t.settingsPage.devices.tabHeader}
          </Typography>
          <Card className={s.card}>
            <div className={s.cardInWrapper}>
              {currentIcon}
              <div className={s.cardDescription}>
                <Typography variant={'bold-text-16'}>{data?.current.osName}</Typography>
                <Typography variant={'regular-text-14'}>IP: {data?.current.ip}</Typography>
              </div>
            </div>
          </Card>
          <ActiveSessions data={data} />
        </div>
      )}
    </div>
  )
}
