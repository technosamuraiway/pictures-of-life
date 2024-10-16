import { useRouter } from 'next/router'

export function useProfileLocale() {
  const router = useRouter()
  const locale: 'en' | 'ru' =
    router.locale === 'en' || router.locale === 'ru' ? router.locale : 'ru'
  const translations = locale === 'en' ? en : ru

  return { ...translations, locale }
}

const en: LocaleType = {
  info: {
    btn: 'Profile settings',
    stats: {
      followers: 'Followers',
      following: 'Following',
      publications: 'Publications',
    },
  },
  postsShower: {
    noPostsTitle: 'No posts',
  },
}

const ru = {
  info: {
    btn: 'Настройки профиля',
    stats: {
      followers: 'Подписчиков',
      following: 'Подписок',
      publications: 'Публикаций',
    },
  },
  postsShower: {
    noPostsTitle: 'Нет постов',
  },
}

type LocaleType = typeof ru
