import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared/hooks'

export default function TermsOfService() {
  const t = useRouterLocaleDefinition()

  return (
    <ServicePrivacy
      buttonBackTitle={t.termsOfService.backToSign}
      mainText={t.termsOfService.text}
      pageTitle={t.termsOfService.title}
      textTitle={t.termsOfService.title}
    />
  )
}
