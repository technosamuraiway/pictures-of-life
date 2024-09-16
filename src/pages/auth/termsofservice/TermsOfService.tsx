import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'

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
