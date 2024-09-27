import { useMemo } from 'react'

import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Devices, GeneralInfo, getLayoutWithNav } from '@/widgets'
import { TabType, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Settings.module.scss'

const Settings = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.settingsPage.general, value: t.settingsPage.general },
      { title: t.settingsPage.devices.tittle, value: t.settingsPage.devices.tittle },
      { title: t.settingsPage.management, value: t.settingsPage.management },
      { title: t.settingsPage.payments, value: t.settingsPage.payments },
    ],
    [
      t.settingsPage.general,
      t.settingsPage.devices.tittle,
      t.settingsPage.management,
      t.settingsPage.payments,
    ]
  )

  const defaultTab = tabsData[0].value
  const tabFromUrl = router.query.tab as string
  const activeTab = tabsData.some(tab => tab.value === tabFromUrl) ? tabFromUrl : defaultTab

  const tabChangeHandler = (newValue: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: newValue },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <>
      <MetaHead title={t.settingsPage.title} />
      {!router.isReady ? (
        <RequestLineLoader />
      ) : (
        <Tabs.Root
          className={s.root}
          defaultValue={activeTab}
          onValueChange={tabChangeHandler}
          tabs={tabsData}
          value={activeTab}
        >
          <GeneralInfo />
          <Devices />
          <Tabs.Content className={s.management} value={t.settingsPage.management}>
            <Typography variant={'h1'}>Management</Typography>
          </Tabs.Content>
          <Tabs.Content className={s.payments} value={t.settingsPage.payments}>
            <Typography variant={'h1'}>Payments</Typography>
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  )
}

Settings.getLayout = getLayoutWithNav
export default Settings
