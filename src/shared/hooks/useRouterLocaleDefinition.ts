import { en, ru } from '@/shared'
import { useRouter } from 'next/router'

export function useRouterLocaleDefinition() {
  const router = useRouter()
  const locale: 'en' | 'ru' =
    router.locale === 'en' || router.locale === 'ru' ? router.locale : 'ru'
  const translations = locale === 'en' ? en : ru

  return { ...translations, locale }
}
