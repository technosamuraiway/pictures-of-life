import { ButtonLink, MetaHead, PATH, useRouterLocaleDefinition } from '@/shared'
import errorImg from '@public/error404.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './_home/Home.module.scss'

export default function Custom404() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.error404Page.title} />
      <div className={s.errorWrapper}>
        <Image alt={'404 page'} height={190} src={errorImg} width={450} />

        <Typography variant={'h2'}>{t.error404Page.mainText}</Typography>
        <ButtonLink linkHref={PATH.HOME} title={t.error404Page.btnText} variant={'secondary'} />
      </div>
    </>
  )
}
