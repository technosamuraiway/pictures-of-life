import { useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { endOfMonth, startOfMonth } from 'date-fns'

import s from './StatisticsPublication.module.scss'

interface IProps {
  value: string
}

export const StatisticsPublicationMonth = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const lastDayOfMonth = endOfMonth(today)

  const monthNames: { [key: string]: string } = t.months

  const getTranslatedMonth = (date: Date): string => {
    const monthKey = date.toLocaleString('en', { month: 'long' }).toLowerCase()

    return monthNames[monthKey] || monthKey
  }

  const labels = Array.from({ length: 10 }, (_, i) => {
    const step = Math.ceil(lastDayOfMonth.getDate() / 10)
    const dayIndex = i * step

    const date = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      Math.min(dayIndex + 1, lastDayOfMonth.getDate())
    )

    return `${getTranslatedMonth(date)} ${date.getDate()}`
  })

  const customOptions = {
    scales: {
      x: {
        ticks: {
          callback: (value: any, index: number) => {
            if (index === 0 || index === labels.length - 1) {
              return labels[index]
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
  const data3 = Array.from({ length: lastDayOfMonth.getDate() }, () =>
    Math.floor(Math.random() * 1000)
  )

  return (
    <>
      <Tabs.Content value={value}>
        <Typography variant={'regular-text-16'}>{t.statisticsPage.publication}</Typography>
        <div className={s.chartDiv}>
          <LineChart
            color1={'rgba(20, 204, 112, 1)'}
            data3={data3}
            labels={labels}
            options={customOptions}
          />
          <div className={s.upDiv}></div>
          <div className={s.downDiv}></div>
        </div>
      </Tabs.Content>
    </>
  )
}
