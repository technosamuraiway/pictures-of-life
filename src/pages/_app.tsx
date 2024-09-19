import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/services/store'
import { NextPage } from 'next'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'
import '@/styles/_tokens.scss'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <NextTopLoader color={'#73a5ff'} />
          <Component {...props.pageProps} />
        </>
      )}
    </Provider>
  )
}
