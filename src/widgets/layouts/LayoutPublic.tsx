import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './BaseLayout.module.scss'

import { LayoutWithAuth } from './components/layoutWithAuth/LayoutWithAuth'
const LayoutPublic: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithAuth>
      <main className={s.main}>{children}</main>
    </LayoutWithAuth>
  )
}

export function getPublicLayout(page: ReactElement) {
  return <LayoutPublic>{page}</LayoutPublic>
}
