import { en, ru } from '@/shared'
import { useRouter } from 'next/router'

export function useRouterLocaleDefinition() {
  const router = useRouter()

  return router.locale === 'en' ? en : ru
}
