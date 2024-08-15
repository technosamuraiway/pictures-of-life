import { useRouter } from 'next/router'

import { en } from '../locales/en'
import { ru } from '../locales/ru'

export function useRouterLocaleDefinition() {
  const router = useRouter()

  if (!router.locale) {
    return ru
  }

  return router.locale === 'en' ? en : ru
}
