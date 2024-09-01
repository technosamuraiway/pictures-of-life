import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'

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
