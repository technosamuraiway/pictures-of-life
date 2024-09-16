import { ServicePrivacy } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'

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
