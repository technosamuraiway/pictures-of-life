import { getLayout } from '@/containers'
import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'

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

TermsOfService.getLayout = getLayout
export default TermsOfService
