import { en } from '@/shared/locales/en'
import { ru } from '@/shared/locales/ru'
import { useRouter } from 'next/router'

export function useRouterLocaleDefinition() {
  const router = useRouter()

  if (!router.locale) {
    return en
  }

  return router.locale === 'en' ? en : ru
}
