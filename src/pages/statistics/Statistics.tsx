import { useMemo, useState } from 'react'

import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import {
  StatisticsCommentsMonth,
  StatisticsCommentsWeek,
  StatisticsLikeMonth,
  StatisticsLikeWeek,
  StatisticsPublicationMonth,
  StatisticsPublicationWeek,
  getLayoutWithNav,
} from '@/widgets'
import { TabType, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Statistics.module.scss'

const Statistics = () => {
  const t = useRouterLocaleDefinition()

  const [activeTabLike, setActiveTabLike] = useState<string>('week')
  const [activeTabComments, setActiveTabComments] = useState<string>('week')
  const [activeTabPublication, setActiveTabPublication] = useState<string>('week')

  const tabsData = useMemo<TabType[]>(
    () => [
      { title: t.statisticsPage.week, value: 'week' },
      { title: t.statisticsPage.month, value: 'month' },
    ],
    [t.statisticsPage.week, t.statisticsPage.month]
  )

  const tabChangeHandlerLike = (newValue: string) => {
    setActiveTabLike(newValue)
  }

  const tabChangeHandlerComments = (newValue: string) => {
    setActiveTabComments(newValue)
  }

  const tabChangeHandlerPublication = (newValue: string) => {
    setActiveTabPublication(newValue)
  }

  return (
    <>
      <MetaHead title={t.statisticsPage.title} />
      <div className={s.statisticsContent}>
        <Typography variant={'h1'}>{t.statisticsPage.title}</Typography>

        <Tabs.Root
          className={s.root}
          defaultValue={activeTabLike}
          listClassName={s.tabsDiv}
          notFullWidth
          onValueChange={tabChangeHandlerLike}
          tabs={tabsData}
          value={activeTabLike}
        >
          <StatisticsLikeWeek value={tabsData[0].value} />
          <StatisticsLikeMonth value={tabsData[1].value} />
        </Tabs.Root>

        <Tabs.Root
          className={s.root}
          defaultValue={activeTabComments}
          listClassName={s.tabsDiv}
          notFullWidth
          onValueChange={tabChangeHandlerComments}
          tabs={tabsData}
          value={activeTabComments}
        >
          <StatisticsCommentsWeek value={tabsData[0].value} />
          <StatisticsCommentsMonth value={tabsData[1].value} />
        </Tabs.Root>

        <Tabs.Root
          className={s.root}
          defaultValue={activeTabPublication}
          listClassName={s.tabsDiv}
          notFullWidth
          onValueChange={tabChangeHandlerPublication}
          tabs={tabsData}
          value={activeTabPublication}
        >
          <StatisticsPublicationWeek value={tabsData[0].value} />
          <StatisticsPublicationMonth value={tabsData[1].value} />
        </Tabs.Root>
      </div>
    </>
  )
}

Statistics.getLayout = getLayoutWithNav
export default Statistics
