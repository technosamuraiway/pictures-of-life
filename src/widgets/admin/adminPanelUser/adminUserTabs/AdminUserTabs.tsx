import { useMemo } from 'react'

import { RequestLineLoader, useRouterLocaleDefinition, useTabsSwitcher } from '@/shared'
import { TabType, Tabs } from '@technosamurai/techno-ui-kit'

import s from './AdminUserTabs.module.scss'

import { Followers } from './followers/Followers'
import { Following } from './following/Following'
import { UserPayments } from './userPayments/UserPayments'
import { UserPostsImages } from './userPostsImages/UserPostsImages'

export const AdminUserTabs = () => {
  const t = useRouterLocaleDefinition()

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.admin.userList.tabs.files.title, value: 'uploaded-files' },
      { title: t.admin.userList.tabs.payments.title, value: 'payments' },
      { title: t.admin.userList.tabs.followers.title, value: 'followers' },
      { title: t.admin.userList.tabs.following.title, value: 'following' },
    ],
    [
      t.admin.userList.tabs.files.title,
      t.admin.userList.tabs.payments.title,
      t.admin.userList.tabs.followers.title,
      t.admin.userList.tabs.following.title,
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
      <UserPostsImages value={tabsData[0].value} />
      <UserPayments value={tabsData[1].value} />
      <Followers value={tabsData[2].value} />
      <Following value={tabsData[3].value} />
    </Tabs.Root>
  )
}
