import { en } from '@/shared/locales/en'
import { ru } from '@/shared/locales/ru'
import { Button } from '@technosamurai/techno-ui-kit'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'

import '@technosamurai/techno-ui-kit/dist/style.css'

import s from '../../pages/_home/Home.module.scss'

import { LangSelect } from '../../shared/components/LangSelect/LangSelect'
import { useRouterLocaleDefinition } from '../../shared/hooks/useRouterLocaleDefinition'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <div className={s.body}>
        <div>{<LangSelect />}</div>
        <main>
          <div>{t.title}</div>
          <Button type={'button'}>{t.passwordRecoveryPage.title}</Button>
        </main>
      </div>
    </>
  )
}
