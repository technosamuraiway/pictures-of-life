import { useEffect, useMemo, useState } from 'react'

import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Devices, GeneralInfo, getLayoutWithNav } from '@/widgets'
import { TabType, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Settings.module.scss'

const Settings = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<null | string>(null)

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.settingsPage.general, value: 'general info' },
      { title: t.settingsPage.devices.tittle, value: 'devices' },
      { title: t.settingsPage.management, value: 'account management' },
      { title: t.settingsPage.payments, value: 'payments' },
    ],
    [
      t.settingsPage.general,
      t.settingsPage.devices.tittle,
      t.settingsPage.management,
      t.settingsPage.payments,
    ]
  )

  useEffect(() => {
    if (router.isReady) {
      const tabFromUrl = router.query.tab as string
      const defaultTab = tabsData[0].value
      const newActiveTab = tabsData.some(tab => tab.value === tabFromUrl) ? tabFromUrl : defaultTab

      setActiveTab(newActiveTab)
    }
  }, [router.isReady, router.query.tab, tabsData])

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
      {activeTab === null ? (
        <RequestLineLoader />
      ) : (
        <Tabs.Root
          className={s.root}
          defaultValue={activeTab}
          onValueChange={tabChangeHandler}
          tabs={tabsData}
          value={activeTab}
        >
          <GeneralInfo value={tabsData[0].value} />
          <Devices value={tabsData[1].value} />
          <Tabs.Content className={s.management} value={tabsData[2].value}>
            <Typography variant={'h1'}>Management</Typography>
          </Tabs.Content>
          <Tabs.Content className={s.payments} value={tabsData[3].value}>
            <Typography variant={'h1'}>Payments</Typography>
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  )
}

Settings.isPrivate = true
Settings.getLayout = getLayoutWithNav
export default Settings
