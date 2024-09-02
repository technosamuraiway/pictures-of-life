import { Confirmation } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import pngExpired from '@public/confirmEmail/expiredConfirm.png'
import pngSuccess from '@public/confirmEmail/successConfirm.png'

const response =
  '/auth/registration-confirmation?code=8a380576-f7f3-459f-8754-bd3134f33cc1&email=zarechnev5021@gmail.com'

export default function RegistrationConfirmation() {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Confirmation
        buttonText={t.successConfirmEmail.buttonText}
        imgAltText={t.successConfirmEmail.imgAltText}
        imgHeight={300}
        imgPngSrc={pngSuccess}
        imgWidth={432}
        mainText={t.successConfirmEmail.mainText}
        pageHeader={t.successConfirmEmail.pageHeader}
        pageTitle={t.successConfirmEmail.title}
      />
      <Confirmation
        buttonText={t.expiredEmailLink.buttonText}
        imgAltText={t.expiredEmailLink.imgAltText}
        imgHeight={352}
        imgPngSrc={pngExpired}
        imgWidth={473}
        mainText={t.expiredEmailLink.mainText}
        pageHeader={t.expiredEmailLink.pageHeader}
        pageTitle={t.expiredEmailLink.title}
      />
    </>
  )
}
