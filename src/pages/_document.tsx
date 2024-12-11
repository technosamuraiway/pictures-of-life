import { browserTheme } from '@/shared'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  const favicon = browserTheme() ? '/lightFavicon.svg' : '/darkFavicon.svg'

  return (
    <Html lang={'en'}>
      <Head>
        <link href={favicon} rel={'icon'} type={'image/svg+xml'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
