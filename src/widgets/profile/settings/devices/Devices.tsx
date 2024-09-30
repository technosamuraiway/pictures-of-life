import { useRetrieveSessionsQuery } from '@/services'
import { RequestLineLoader, findIcon, useRouterLocaleDefinition } from '@/shared'
import { Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Devices.module.scss'

import { ActiveSessions } from './activeSessions/ActiveSessions'
import { SessionCard } from './sessionCard/SessionCard'

interface IProps {
  value: string
}

export const Devices = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { data: retrieveSessionsData, isLoading: retrieveSessionsIsLoading } =
    useRetrieveSessionsQuery()
  const currentIcon = findIcon(retrieveSessionsData?.current?.browserName, 'browser')

  return (
    <>
      <Tabs.Content className={s.devices} value={value}>
        {retrieveSessionsIsLoading ? (
          <RequestLineLoader />
        ) : (
          <>
            <Typography className={s.text} variant={'h3'}>
              {t.settingsPage.devices.tabHeader}
            </Typography>
            <SessionCard
              currentIcon={currentIcon}
              ip={retrieveSessionsData?.current.ip}
              tittle={retrieveSessionsData?.current.browserName}
            />
            <ActiveSessions />
          </>
        )}
      </Tabs.Content>
    </>
  )
}
