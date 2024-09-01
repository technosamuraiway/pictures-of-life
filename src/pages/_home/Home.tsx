import { LangSelect } from '@/shared/components/LangSelect/LangSelect'
import { MetaHead } from '@/shared/components/metaHead/MetaHead'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Button } from '@technosamurai/techno-ui-kit'
import { Inter } from 'next/font/google'

import s from '@/pages/_home/Home.module.scss'

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
      </div>
    </>
  )
}
