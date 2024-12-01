import { useEffect, useState } from 'react'

import { TabType } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

export const useTabsSwitcher = (tabsData: TabType[]) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<null | string>(null)

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

  return {
    activeTab,
    tabChangeHandler,
  }
}
