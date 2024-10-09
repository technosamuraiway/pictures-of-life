import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'

import { AuthGuard } from '@/services'
import { wrapper } from '@/services/store'
import { NextPage } from 'next'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/_colors.scss'
import '@/styles/_tokens.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'
// eslint-disable-next-line import/extensions
import 'swiper/scss'

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
      <AuthGuard>
        {getLayout(
          <>
            <NextTopLoader color={'#73a5ff'} />
            <Component {...props.pageProps} />
          </>
        )}
      </AuthGuard>
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
