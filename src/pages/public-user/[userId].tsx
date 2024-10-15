import { useRouter } from 'next/router'

import s from './[userId].module.scss'
export default function PublicUserPage() {
  const router = useRouter()
  const { userId } = router.query

  return (
    <div>
      <h1 className={s.h1}>Hello User {userId}</h1>
    </div>
  )
}
