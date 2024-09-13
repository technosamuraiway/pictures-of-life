import { ServicePrivacy } from '@/entities'
import { getBaseLayout, useRouterLocaleDefinition } from '@/shared'

function TermsOfService() {
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

TermsOfService.getLayout = getBaseLayout
export default TermsOfService
