import { MetaHead, useGoogleAuth } from '@/shared'
import { FollowersPosts, getLayoutWithNav } from '@/widgets'

function Home() {
  useGoogleAuth()

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <FollowersPosts />
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
