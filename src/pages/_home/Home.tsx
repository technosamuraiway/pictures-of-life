import { MetaHead, useGoogleAuth, useRouterLocaleDefinition } from '@/shared'
import { FollowersPosts, getLayoutWithNav } from '@/widgets'

function Home() {
  useGoogleAuth()
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.home.title} />
      <FollowersPosts />
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
