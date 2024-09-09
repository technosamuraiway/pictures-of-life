import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { LangSelect } from '@/shared/components/LangSelect/LangSelect'
import { Button, MyDatePicker } from '@technosamurai/techno-ui-kit'
import { Inter } from 'next/font/google'

import s from './Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <div className={s.body}>
        <div>{<LangSelect />}</div>
        <div>{t.title}</div>
        <Button type={'button'}>{t.passwordRecoveryPage.title}</Button>

        <div className={'div'}>
          <MyDatePicker locale={t.locale} />
        </div>
      </div>
    </>
  )
}
