import type { AppProps } from 'next/app'

import React from 'react'

import Layout from '@/shared/components/Layout/Layout'
import NextTopLoader from 'nextjs-toploader'

import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextTopLoader color={'#73a5ff'} />
      <Component {...pageProps} />
    </Layout>
  )
}
