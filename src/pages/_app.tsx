import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'

import { AuthGuard } from '@/containers'
import { wrapper } from '@/services/store'
import { NextPage } from 'next'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/_colors.scss'
import '@/styles/_tokens.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
  isPrivate?: boolean
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? (page => page)

  const pageContent = (
    <>
      {getLayout(
        <>
          <NextTopLoader color={'#73a5ff'} showSpinner={false} />
          <Component {...props.pageProps} />
        </>
      )}
    </>
  )

  const WithAuthGuard = Component.isPrivate ? <AuthGuard>{pageContent}</AuthGuard> : pageContent

  return (
    <Provider store={store}>
      {WithAuthGuard}
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
        transition={Slide}
      />
    </Provider>
  )
}
