import type { AppProps } from 'next/app'

import '@/styles/globals.scss'
import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import Layout from '@/shared/components/Layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
