import { ServicePrivacy } from '@/entities'
import { getBaseLayout, useRouterLocaleDefinition } from '@/shared'

function PrivacyPolicy() {
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

PrivacyPolicy.getLayout = getBaseLayout
export default PrivacyPolicy
