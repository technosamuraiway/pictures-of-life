import { useState } from 'react'

import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { GeneralInfo, getLayoutWithNav } from '@/widgets'
import { TabType, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Settings.module.scss'

const Settings = () => {
  const t = useRouterLocaleDefinition()

  const tabsData: TabType[] = [
    { title: t.settingsPage.general, value: t.settingsPage.general },
    { title: t.settingsPage.devices, value: t.settingsPage.devices },
    { title: t.settingsPage.management, value: t.settingsPage.management },
    { title: t.settingsPage.payments, value: t.settingsPage.payments },
  ]

  const [tabsValue, setTabsValue] = useState<string>(tabsData[0].value)

  return (
    <>
      <MetaHead title={t.settingsPage.title} />
      <Tabs.Root
        className={s.root}
        defaultValue={tabsValue}
        onValueChange={setTabsValue}
        tabs={tabsData}
        value={tabsValue}
      >
        <GeneralInfo />
        <Tabs.Content className={s.devices} value={t.settingsPage.devices}>
          <Typography variant={'h1'}>Devices</Typography>
        </Tabs.Content>
        <Tabs.Content className={s.management} value={t.settingsPage.management}>
          <Typography variant={'h1'}>Management</Typography>
        </Tabs.Content>
        <Tabs.Content className={s.payments} value={t.settingsPage.payments}>
          <Typography variant={'h1'}>Payments</Typography>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

Settings.getLayout = getLayoutWithNav
export default Settings
