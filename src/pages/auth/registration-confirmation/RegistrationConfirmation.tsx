import { Confirmation } from '@/entities'
import pngSuccess from '@public/confirmEmail/successConfirm.png'
import webpSuccess from '@public/confirmEmail/successConfirm.webp'

export default function RegistrationConfirmation() {
  return (
    <Confirmation
      buttonText={'SignIn'}
      imgAltText={'text'}
      imgHeight={300}
      imgPngSrc={pngSuccess}
      imgWebpSrc={webpSuccess}
      imgWidth={432}
      mainText={'Your email has been confirmed'}
      pageHeader={'Confirmation'}
      pageTitle={'Confirmation'}
    />
  )
}
