import { useMemo } from 'react'

import { MetaHead, RequestLineLoader, useRouterLocaleDefinition, useTabsSwitcher } from '@/shared'
import { Devices, GeneralInfo, Management, Payments, getLayoutWithNav } from '@/widgets'
import { TabType, Tabs } from '@technosamurai/techno-ui-kit'

import s from './Settings.module.scss'

const Settings = () => {
  const t = useRouterLocaleDefinition()

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.settingsPage.general, value: 'general info' },
      { title: t.settingsPage.devices.title, value: 'devices' },
      { title: t.settingsPage.management.title, value: 'account management' },
      { title: t.settingsPage.payments.myPayments, value: 'payments' },
    ],
    [
      t.settingsPage.general,
      t.settingsPage.devices.title,
      t.settingsPage.management,
      t.settingsPage.payments,
    ]
  )

  const { activeTab, tabChangeHandler } = useTabsSwitcher(tabsData)

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
          <Management value={tabsData[2].value} />
          <Payments value={tabsData[3].value} />
        </Tabs.Root>
      )}
    </>
  )
}

Settings.getLayout = getLayoutWithNav
export default Settings
