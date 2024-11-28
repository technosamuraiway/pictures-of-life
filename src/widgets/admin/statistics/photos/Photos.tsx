import React, { useState } from 'react'

import { SortDirection } from '@/services/graphql/codegen/graphql'
import { GET_POSTS } from '@/services/graphql/queries/posts'
import { InitLoader, useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { useQuery } from '@apollo/client'
import { DateValue } from '@internationalized/date'
import { Calendar, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { endOfMonth, startOfMonth, subMonths } from 'date-fns'

import s from './Photos.module.scss'

interface IProps {
  value: string
}

export const Photos = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const today = new Date()

  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const currentMonthStart = startOfMonth(today)
  const currentMonthEnd = endOfMonth(today)
  const previousMonthStart = startOfMonth(subMonths(today, 1))
  const previousMonthEnd = endOfMonth(subMonths(today, 1))

  const { data, loading } = useQuery(GET_POSTS, {
    variables: {
      endCursorPostId: 0,
      pageSize: 1000,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    },
  })

  const isValidRange = (start: Date | null, end: Date | null): boolean => {
    if (!start || !end) {
      return false
    }

    return start >= previousMonthStart && end <= currentMonthEnd
  }

  const handleRangeChange = (range: { end: DateValue; start: DateValue }) => {
    const start = range.start ? new Date(range.start.toString()) : null
    const end = range.end ? new Date(range.end.toString()) : null

    if (isValidRange(start, end)) {
      setSelectedDateRange([start, end])
      setErrorMessage(undefined)
    } else {
      setErrorMessage(t.admin.statistics.invalidDateRange || 'Select current or last month')
    }
  }

  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const formatDataToMb = (data: number[]) => data.map(value => (value / (1024 * 1024)).toFixed(2))
  const newPhotosLastMonthInMb = React.useMemo(() => {
    const [start, end] = selectedDateRange

    if (loading || !data) {
      return Array(31).fill(0)
    }

    if (start && end) {
      const filteredPhotos = data.getPosts.items.flatMap(post =>
        post.images
          ? post.images.filter(image => {
              const createdAt = new Date(image.createdAt)

              return createdAt >= start && createdAt <= end
            })
          : []
      )

      const dataByDay = labels.map(label => {
        const day = Number(label)

        return filteredPhotos
          .filter(image => new Date(image.createdAt).getDate() === day)
          .reduce((sum, image) => sum + (image.fileSize || 0), 0)
      })

      return formatDataToMb(dataByDay)
    }

    const filteredPhotos = data.getPosts.items.flatMap(post =>
      post.images
        ? post.images.filter(image => {
            const createdAt = new Date(image.createdAt)

            return createdAt >= previousMonthStart && createdAt <= previousMonthEnd
          })
        : []
    )

    const dataByDay = labels.map(label => {
      const day = Number(label)

      return filteredPhotos
        .filter(image => new Date(image.createdAt).getDate() === day)
        .reduce((sum, image) => sum + (image.fileSize || 0), 0)
    })

    return formatDataToMb(dataByDay)
  }, [selectedDateRange, data, labels, loading, previousMonthStart, previousMonthEnd])

  const newPhotosCurrentMonthInMb = React.useMemo(() => {
    if (loading || !data) {
      return Array(31).fill(0)
    }

    const filteredPhotos = data.getPosts.items.flatMap(post =>
      post.images
        ? post.images.filter(image => {
            const createdAt = new Date(image.createdAt)

            return createdAt >= currentMonthStart && createdAt <= currentMonthEnd
          })
        : []
    )

    const dataByDay = labels.map(label => {
      const day = Number(label)

      return filteredPhotos
        .filter(image => new Date(image.createdAt).getDate() === day)
        .reduce((sum, image) => sum + (image.fileSize || 0), 0)
    })

    return formatDataToMb(dataByDay)
  }, [data, labels, loading, currentMonthStart, currentMonthEnd])

  if (loading) {
    return <InitLoader />
  }

  return (
    <>
      <Tabs.Content className={s.photosDiv} value={value}>
        <Typography variant={'h1'}>{t.admin.statistics.uploadedPhotos}</Typography>
        <div className={s.textContent}>
          <div className={s.divTextContent}>
            <div className={s.divText}>
              <div className={s.firstCircle}></div>
              <Typography variant={'regular-text-14'}>{t.admin.statistics.lastMonth}</Typography>
            </div>
            <div className={s.divText}>
              <div className={s.secondCircle}></div>
              <Typography variant={'regular-text-14'}>{t.admin.statistics.currentMonth}</Typography>
            </div>
          </div>
          <div className={s.calendarDiv}>
            <Calendar
              errorMessage={errorMessage}
              labelText={t.admin.statistics.date}
              locale={t.locale}
              mode={'range'}
              onRangeChange={handleRangeChange}
            />
            {errorMessage && (
              <Typography className={s.error} variant={'small-text'}>
                {t.admin.statistics.invalidDateRange}
              </Typography>
            )}
          </div>
        </div>
        <div className={s.usersChart}>
          <LineChart
            color1={'rgba(10, 102, 56, 1)'}
            color2={'rgba(128, 255, 191, 1)'}
            data1={newPhotosLastMonthInMb}
            data2={newPhotosCurrentMonthInMb}
            formatYAxis={value => `${value} MB`}
            labels={labels}
          />
        </div>
      </Tabs.Content>
    </>
  )
}
