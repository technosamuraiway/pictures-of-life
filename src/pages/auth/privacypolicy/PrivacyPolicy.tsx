import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'

export default function PrivacyPolicy() {
  const t = useRouterLocaleDefinition()

  return (
    <ServicePrivacy
      buttonBackTitle={t.privacyPolicy.backToSign}
      mainText={t.privacyPolicy.text}
      pageTitle={t.privacyPolicy.title}
      textTitle={t.privacyPolicy.title}
    />
  )
}
