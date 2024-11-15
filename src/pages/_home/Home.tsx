import { MetaHead, PATH, useGoogleAuth } from '@/shared'
import { getLayoutWithNav } from '@/widgets'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Home.module.scss'

function Home() {
  useGoogleAuth()

  const { push } = useRouter()

  return (
    <>
      <MetaHead title={'Pictures-Of-Life'} />
      <>
        <div className={s.links}>
          <Link href={PATH.HOME}>Home</Link>
          <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
          <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
          <Link href={PATH.AUTH.FORGOTPASSWORD}>Forgot Password</Link>
          <Link href={PATH.PROFILE.SETTINGS}>Settings</Link>
          <Link href={PATH.PUBLIC}>Public Posts</Link>
        </div>

        <button
          onClick={() => {
            push(`${PATH.PROFILE.BASEPROFILE}/${1478}`)
          }}
          type={'button'}
        >
          🟢🟢🟢 Надежда 🟢🟢🟢
        </button>

        <button
          onClick={() => {
            push(`${PATH.PROFILE.BASEPROFILE}/${1480}`)
          }}
          type={'button'}
        >
          🔵🔵🔵 Дмитрий 🔵🔵🔵
        </button>

        <button
          onClick={() => {
            push(`${PATH.PROFILE.BASEPROFILE}/${1574}`)
          }}
          type={'button'}
        >
          🟣🟣🟣 Александр 🟣🟣🟣
        </button>
      </>
    </>
  )
}

Home.getLayout = getLayoutWithNav
export default Home
