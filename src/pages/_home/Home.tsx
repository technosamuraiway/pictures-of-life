import { useMeCurInfoQuery } from '@/services'
import { MetaHead, PATH, useGoogleAuth } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './Home.module.scss'

function Home() {
  //const { data: meData } = useMeCurInfoQuery()

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
          </div>
          {/*{meData && <Typography>{`${meData.userName}-is log in`}</Typography>}*/}
        </>
      )}
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
