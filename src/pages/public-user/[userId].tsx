import { useRouter } from 'next/router'

export default function PublicUserPage() {
  const router = useRouter()
  const { userId } = router.query // Получаем userId из URL

  return (
    <div>
      <h1>Hello User {userId}</h1>
    </div>
  )
}
