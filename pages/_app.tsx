import type { AppProps } from 'next/app'

import { App } from '@/application'

import '@/application/index.scss'

export default function MyApp(props: AppProps) {
  return <App {...props} />
}
