import { MetaHead, PATH, useGoogleAuth } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import Link from 'next/link'

import s from './Home.module.scss'

function Home() {
  const { isGoogleSignLoading } = useGoogleAuth()

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      {isGoogleSignLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className={s.links}>
            <Link href={PATH.HOME}>Home</Link>
            <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
            <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
            <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
            <Link href={PATH.PROFILE.SETTINGS}>Settings</Link>
            <Link href={PATH.PUBLIC}>Public Posts</Link>
            <Link href={'/posts'}>Mock all POSTS</Link>
          </div>
        </>
      )}
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
