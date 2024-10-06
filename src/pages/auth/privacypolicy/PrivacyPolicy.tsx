import { getLayout } from '@/containers'
import { ServicePrivacy } from '@/entities'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

function PrivacyPolicy() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const { previousPath } = router.query

  let buttonBackTitle: string = t.privacyPolicy.backToSign
  let btnHref: string = PATH.AUTH.SIGNUP

  if (previousPath === PATH.PROFILE.SETTINGS) {
    buttonBackTitle = t.privacyPolicy.backToProfile
    btnHref = PATH.PROFILE.SETTINGS
  }

  return (
    <ServicePrivacy
      btnHref={btnHref}
      buttonBackTitle={buttonBackTitle}
      mainText={t.privacyPolicy.text}
      pageTitle={t.privacyPolicy.title}
      textTitle={t.privacyPolicy.title}
    />
  )
}

PrivacyPolicy.getLayout = getLayout
export default PrivacyPolicy
