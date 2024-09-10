import { MetaHead, useRouterLocaleDefinition } from '@/shared'

import s from './Home.module.scss'

export default function Home() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <div className={s.body}>
        <div>{t.title}</div>
      </div>
    </>
  )
}
