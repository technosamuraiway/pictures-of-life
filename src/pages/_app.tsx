import type { AppProps } from 'next/app'

import Layout from '@/shared/components/Layout/Layout'

import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
