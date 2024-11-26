import { useRouterLocaleDefinition } from '@/shared'
import LineChart from '@/shared/components/lineChart/lineChart'
import { Calendar, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Photos.module.scss'

interface IProps {
  value: string
}

export const Photos = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const newUsersLastMonth = [0, 500, 1000, 1500, 2000, 2500, 3000, 2000, 1500, 1000, 500, 0]
  const newUsersCurrentMonth = [0, 400, 800, 1200, 1600, 2000, 2400, 2800, 2400, 2000, 1600, 1200]

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
          <Calendar labelText={t.admin.statistics.date} locale={t.locale} mode={'range'} />
        </div>
        <div className={s.usersChart}>
          <LineChart
            color1={'rgba(10, 102, 56, 1)'}
            color2={'rgba(128, 255, 191, 1)'}
            data1={newUsersLastMonth}
            data2={newUsersCurrentMonth}
            labels={labels}
          />
        </div>
      </Tabs.Content>
    </>
  )
}
