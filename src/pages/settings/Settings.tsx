import { useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { GeneralInfo, getLayoutWithNav } from '@/widgets'
import { TabType, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Settings.module.scss'

const Settings = () => {
  const t = useRouterLocaleDefinition()

  const tabsData: TabType[] = [
    { title: t.settings.general, value: t.settings.general },
    { title: t.settings.devices, value: t.settings.devices },
    { title: t.settings.management, value: t.settings.management },
    { title: t.settings.payments, value: t.settings.payments },
  ]

  const [tabsValue, setTabsValue] = useState<string>(tabsData[0].value)

  return (
    <Tabs.Root
      className={s.root}
      defaultValue={tabsValue}
      onValueChange={setTabsValue}
      tabs={tabsData}
      value={tabsValue}
    >
      <GeneralInfo />
      <Tabs.Content className={s.devices} value={t.settings.devices}>
        <Typography variant={'h1'}>Devices</Typography>
      </Tabs.Content>
      <Tabs.Content className={s.management} value={t.settings.management}>
        <Typography variant={'h1'}>Management</Typography>
      </Tabs.Content>
      <Tabs.Content className={s.payments} value={t.settings.payments}>
        <Typography variant={'h1'}>Payments</Typography>
      </Tabs.Content>
    </Tabs.Root>
  )
}

Settings.getLayout = getLayoutWithNav
export default Settings
