import { useEffect, useMemo, useState } from 'react'

import { useSignInAdminStore } from '@/services/store/signInAdminStore'
import { MetaHead, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Photos } from '@/widgets/admin/statistics/photos/Photos'
import { Users } from '@/widgets/admin/statistics/users/Users'
import { TabType, Tabs } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Statistics.module.scss'
const Statistics = () => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { logged } = useSignInAdminStore()

  useEffect(() => {
    // Проверка верификации администратора
    if (!logged) {
      // Перенаправление на страницу входа для администраторов
      router.replace(PATH.AUTH.SIGNINADMIN)
    }
  }, [router, logged])

  const [activeTab, setActiveTab] = useState<null | string>(null)

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.admin.statistics.users, value: 'users' },
      { title: t.admin.statistics.photos, value: 'photos' },
    ],
    [t.admin.statistics.users, t.admin.statistics.photos]
  )

  useEffect(() => {
    if (router.isReady) {
      const tabFromUrl = router.query.tab as string
      const defaultTab = tabsData[0].value
      const newActiveTab = tabsData.some(tab => tab.value.includes(tabFromUrl))
        ? tabFromUrl
        : defaultTab

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
      <MetaHead title={t.admin.statistics.title} />
      <div className={s.tabsDiv}></div>
      {activeTab === null ? (
        <RequestLineLoader />
      ) : (
        <Tabs.Root
          className={s.root}
          defaultValue={activeTab}
          listClassName={s.customRoot}
          notFullWidth
          onValueChange={tabChangeHandler}
          tabs={tabsData}
          value={activeTab}
        >
          <Users value={tabsData[0].value} />
          <Photos value={tabsData[1].value} />
        </Tabs.Root>
      )}
    </>
  )
}

Statistics.getLayout = getLayoutWithNav
export default Statistics
