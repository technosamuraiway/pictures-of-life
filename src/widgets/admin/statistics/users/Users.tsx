import { useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { Calendar, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Users.module.scss'

interface IProps {
  value: string
}

export const Users = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const newUsersLastMonth = [0, 500, 1000, 1500, 2000, 2500, 3000, 2000, 1500, 1000, 500, 0]
  const newUsersCurrentMonth = [0, 400, 800, 1200, 1600, 2000, 2400, 2800, 2400, 2000, 1600, 1200]

  const paidAccountsLastMonth = [
    0, 300, 600, 900, 1200, 1500, 1800, 3000, 1500, 1200, 900, 600, 300,
  ]
  const paidAccountsCurrentMonth = [0, 400, 800, 1200, 1600, 2000, 2400, 2000, 1600, 1200, 800, 400]

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
          <Calendar labelText={t.admin.statistics.date} locale={t.locale} mode={'range'} />
        </div>
        <div className={s.usersChart}>
          <LineChart
            color1={'rgba(35, 78, 153, 1)'}
            color2={'rgba(115, 165, 255, 1)'}
            data1={newUsersLastMonth}
            data2={newUsersCurrentMonth}
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
            <Calendar labelText={t.admin.statistics.date} locale={t.locale} mode={'range'} />
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
