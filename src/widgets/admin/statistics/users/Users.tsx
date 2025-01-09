import React, { useState } from 'react'

import { SortDirection, UserBlockStatus } from '@/services/graphql/codegen/graphql'
import { GET_PAYMENTS } from '@/services/graphql/queries/paymets'
import { GET_USERS } from '@/services/graphql/queries/user'
import { InitLoader, useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { useQuery } from '@apollo/client'
import { DateValue as ReactDateValue } from '@react-types/datepicker'
import { Calendar, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { endOfMonth, startOfMonth, subMonths } from 'date-fns'

import s from './Users.module.scss'

interface IProps {
  value: string
}

export const Users = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()
  const today = new Date()

  const [userDateRange, setUserDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [paymentDateRange, setPaymentDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [errorMessageUser, setErrorMessageUser] = useState<string | undefined>()
  const [errorMessagePayment, setErrorMessagePayment] = useState<string | undefined>()
  const currentMonthStart = startOfMonth(today)
  const currentMonthEnd = endOfMonth(today)

  const previousMonthStart = startOfMonth(subMonths(today, 1))
  const previousMonthEnd = endOfMonth(subMonths(today, 1))

  const { data: monthData, loading: monthLoading } = useQuery(GET_USERS, {
    variables: {
      pageNumber: 1,
      pageSize: 100, // Получаем все записи для фильтрации
      searchTerm: '',
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      statusFilter: UserBlockStatus.All,
    },
  })

  const { data: paymentsData, loading: paymentsLoading } = useQuery(GET_PAYMENTS, {
    variables: {
      pageNumber: 1,
      pageSize: 100,
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
  const currentMonthUsers = monthData?.getUsers?.users.filter(user => {
    const createdAt = new Date(user.createdAt)

    return createdAt >= currentMonthStart && createdAt <= currentMonthEnd
  })
  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const dataForChart = labels.map(label => {
    const day = Number(label)
    const count =
      currentMonthUsers?.filter(user => new Date(user.createdAt).getDate() === day).length || 0

    return count
  })

  const todayDate = today.getDate()

  // Ограничиваем данные до текущего числа
  const truncatedDataForChart = dataForChart.slice(0, todayDate)
  const previousMonthUsers = monthData?.getUsers?.users.filter(user => {
    const createdAt = new Date(user.createdAt)

    return createdAt >= previousMonthStart && createdAt <= previousMonthEnd
  })

  const newUsersLastMonth = React.useMemo(() => {
    const [start, end] = userDateRange

    if (start && end) {
      const filteredUsers = monthData?.getUsers?.users.filter(user => {
        const createdAt = new Date(user.createdAt)

        return createdAt >= start && createdAt <= end
      })

      return labels.map(label => {
        const day = Number(label)
        const count =
          filteredUsers?.filter(user => new Date(user.createdAt).getDate() === day).length || 0

        return count
      })
    }

    // Если даты не выбраны, используем данные за прошлый месяц
    return labels.map(label => {
      const day = Number(label)
      const count =
        previousMonthUsers?.filter(user => new Date(user.createdAt).getDate() === day).length || 0

      return count
    })
  }, [userDateRange, previousMonthUsers, labels, monthData])

  const handleRangeChangeUser = (range: { end: ReactDateValue; start: ReactDateValue }) => {
    const start = range.start ? new Date(range.start.toString()) : null
    const end = range.end ? new Date(range.end.toString()) : null

    if (isValidRange(start, end)) {
      setUserDateRange([start, end])
      setErrorMessageUser(undefined)
    } else {
      setErrorMessageUser(t.admin.statistics.invalidDateRange || 'Select current or last month')
    }
  }

  const handleRangeChangePayment = (range: { end: ReactDateValue; start: ReactDateValue }) => {
    const start = range.start ? new Date(range.start.toString()) : null
    const end = range.end ? new Date(range.end.toString()) : null

    if (isValidRange(start, end)) {
      setPaymentDateRange([start, end])
      setErrorMessagePayment(undefined)
    } else {
      setErrorMessagePayment(t.admin.statistics.invalidDateRange || 'Select current or last month')
    }
  }
  const paidAccountsLastMonth = React.useMemo(() => {
    const [start, end] = paymentDateRange

    if (start && end) {
      const filteredPayments = paymentsData?.getPayments?.items.filter(payment => {
        const createdAt = new Date(payment.createdAt)

        return createdAt >= start && createdAt <= end
      })

      return labels.map(label => {
        const day = Number(label)

        return (
          filteredPayments?.filter(payment => new Date(payment.createdAt).getDate() === day)
            .length || 0
        )
      })
    }

    const filteredPayments = paymentsData?.getPayments?.items.filter(payment => {
      const createdAt = new Date(payment.createdAt)

      return createdAt >= previousMonthStart && createdAt <= previousMonthEnd
    })

    return labels.map(label => {
      const day = Number(label)

      return (
        filteredPayments?.filter(payment => new Date(payment.createdAt).getDate() === day).length ||
        0
      )
    })
  }, [paymentDateRange, paymentsData, previousMonthStart, previousMonthEnd, labels])

  const paidAccountsCurrentMonth = React.useMemo(() => {
    if (!paymentsData) {
      return Array(31).fill(0)
    }

    const filteredPayments = paymentsData.getPayments.items.filter(payment => {
      const createdAt = new Date(payment.createdAt)

      return createdAt >= currentMonthStart && createdAt <= currentMonthEnd
    })

    return labels.map(label => {
      const day = Number(label)

      return filteredPayments.filter(payment => new Date(payment.createdAt).getDate() === day)
        .length
    })
  }, [paymentsData, currentMonthStart, currentMonthEnd, labels])

  if (monthLoading || paymentsLoading) {
    return <InitLoader />
  }

  return (
    <>
      <Tabs.Content className={s.usersDiv} value={value}>
        <Typography variant={'h1'}>{t.admin.statistics.newUsers}</Typography>
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
              errorMessage={errorMessageUser}
              labelText={t.admin.statistics.date}
              locale={t.locale}
              mode={'range'}
              onRangeChange={handleRangeChangeUser}
            />
            {errorMessageUser && (
              <Typography className={s.error} variant={'small-text'}>
                {t.admin.statistics.invalidDateRange}
              </Typography>
            )}
          </div>
        </div>
        <div className={s.usersChart}>
          <LineChart
            color1={'rgba(35, 78, 153, 1)'}
            color2={'rgba(115, 165, 255, 1)'}
            data1={newUsersLastMonth}
            data2={truncatedDataForChart}
            labels={labels}
          />
        </div>
        <div className={s.paidsDiv}>
          <Typography variant={'h1'}>{t.admin.statistics.paidAccounts}</Typography>
          <div className={s.textContent}>
            <div className={s.divTextContent}>
              <div className={s.divText}>
                <div className={s.firstCirclePaid}></div>
                <Typography variant={'regular-text-14'}>{t.admin.statistics.lastMonth}</Typography>
              </div>
              <div className={s.divText}>
                <div className={s.secondCirclePaid}></div>
                <Typography variant={'regular-text-14'}>
                  {t.admin.statistics.currentMonth}
                </Typography>
              </div>
            </div>
            <div className={s.calendarDiv}>
              <Calendar
                errorMessage={errorMessagePayment}
                labelText={t.admin.statistics.date}
                locale={t.locale}
                mode={'range'}
                onRangeChange={handleRangeChangePayment}
              />
              {errorMessagePayment && (
                <Typography className={s.error} variant={'small-text'}>
                  {t.admin.statistics.invalidDateRange}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className={s.paidChart}>
          <LineChart
            color1={'rgba(102, 68, 0, 1)'}
            color2={'rgba(255, 208, 115, 1)'}
            data1={paidAccountsLastMonth}
            data2={paidAccountsCurrentMonth}
            labels={labels}
          />
        </div>
      </Tabs.Content>
    </>
  )
}
