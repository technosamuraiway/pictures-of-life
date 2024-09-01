import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { wrapper } from '@/services/store'
import Layout from '@/shared/components/Layout/Layout'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'

export default function App({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <NextTopLoader color={'#73a5ff'} />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}
