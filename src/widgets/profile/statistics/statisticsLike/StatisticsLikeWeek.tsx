import { useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

import s from './StatisticsLike.module.scss'

interface IProps {
  value: string
}

export const StatisticsLikeWeek = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const today = new Date()
  const monthNames: { [key: string]: string } = t.months

  const getTranslatedMonth = (date: Date): string => {
    const monthKey = date.toLocaleString('en', { month: 'long' }).toLowerCase()

    return monthNames[monthKey] || monthKey
  }

  const currentStartOfWeek = startOfWeek(today, { weekStartsOn: 1 })
  const currentEndOfWeek = endOfWeek(today, { weekStartsOn: 1 })

  const weekDates = eachDayOfInterval({ end: currentEndOfWeek, start: currentStartOfWeek })
  const weekLabels = weekDates.map(date => `${getTranslatedMonth(date)} ${date.getDate()}`)

  const weekData = weekDates.map(() => Math.floor(Math.random() * 1000))

  const customOptions = {
    scales: {
      x: {
        ticks: {
          callback: (value: any, index: number) => {
            if (index === 0 || index === weekLabels.length - 1) {
              return weekLabels[index] // Первая и последняя метка
            }

            return null
          },
          color: '#ffffff',
        },
      },
      y: {
        beginAtZero: true,

        suggestedMax: 1000,
        ticks: {
          callback: (value: number) => {
            return value
          },
          color: '#ffffff',
          stepSize: 200,
        },
      },
    },
  }

  return (
    <Tabs.Content value={value}>
      <Typography variant={'regular-text-16'}>{t.statisticsPage.like}</Typography>
      <div className={s.chartDiv}>
        <LineChart
          color1={'rgba(204, 20, 57, 1)'}
          data3={weekData}
          labels={weekLabels}
          options={customOptions}
        />
        <div className={s.upDiv}></div>
        <div className={s.downDiv}></div>
      </div>
    </Tabs.Content>
  )
}
