import { useRouterLocaleDefinition } from '@/shared'
import { Calendar, Tabs, Typography } from '@technosamurai/techno-ui-kit'

import s from './Users.module.scss'

interface IProps {
  value: string
}

export const Users = ({ value }: IProps) => {
  const t = useRouterLocaleDefinition()

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
      </Tabs.Content>
    </>
  )
}
