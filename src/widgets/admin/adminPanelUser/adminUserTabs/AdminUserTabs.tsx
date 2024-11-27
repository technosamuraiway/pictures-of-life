import { useMemo } from 'react'

import { RequestLineLoader, useRouterLocaleDefinition, useTabsSwitcher } from '@/shared'
import { TabType, Tabs } from '@technosamurai/techno-ui-kit'

import s from './AdminUserTabs.module.scss'

export const AdminUserTabs = () => {
  const t = useRouterLocaleDefinition()

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.admin.userList.tabs.files, value: 'uploaded-files' },
      { title: t.admin.userList.tabs.payments, value: 'payments' },
      { title: t.admin.userList.tabs.followers, value: 'followers' },
      { title: t.admin.userList.tabs.following, value: 'following' },
    ],
    [
      t.admin.userList.tabs.files,
      t.admin.userList.tabs.payments,
      t.admin.userList.tabs.followers,
      t.admin.userList.tabs.following,
    ]
  )

  const { activeTab, tabChangeHandler } = useTabsSwitcher(tabsData)

  return activeTab === null ? (
    <RequestLineLoader />
  ) : (
    <Tabs.Root
      className={s.root}
      defaultValue={activeTab}
      onValueChange={tabChangeHandler}
      tabs={tabsData}
      value={activeTab}
    >
      <Tabs.Content value={tabsData[0].value}>1</Tabs.Content>
      <Tabs.Content value={tabsData[1].value}>2</Tabs.Content>
      <Tabs.Content value={tabsData[2].value}>3</Tabs.Content>
      <Tabs.Content value={tabsData[3].value}>4</Tabs.Content>
    </Tabs.Root>
  )
}
