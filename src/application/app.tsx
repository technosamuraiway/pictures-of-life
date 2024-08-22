import type { AppProps } from 'next/app'

import Layout from '@/shared/components/Layout/Layout'

export function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
