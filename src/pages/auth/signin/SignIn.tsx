import { OAuth, SignInForm } from '@/entities'
import { SignInFormValues } from '@/entities/zodValidationScheme'
import { authService } from '@/services/flow/auth.service'
import {
  FormQuestionBlock,
  MetaHead,
  PATH,
  RequestLineLoader,
  saveStateToLocalStorage,
  useRouterLocaleDefinition,
} from '@/shared'
import { getBaseLayout } from '@/widgets'
import { Card } from '@technosamurai/techno-ui-kit'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

function SignIn() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const [signIn, { isLoading: SignInIsLoading }] = authService.useSignInMutation()

  const onSubmitSignInForm = (data: SignInFormValues, resetForm: () => void) => {
    signIn({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then(result => {
        const { accessToken } = result

        saveStateToLocalStorage('accessToken', accessToken)

        const decodedToken: { userId: string } = jwtDecode(accessToken)
        const { userId } = decodedToken

        resetForm()
        router.replace(`/profile/${userId}`)
      })
  }

  return (
    <>
      {SignInIsLoading && <RequestLineLoader />}
      <MetaHead title={t.signInPage.title} />
      <Card className={s.cardContainer}>
        <OAuth title={t.signInPage.title} />

        <SignInForm buttonDisabled={SignInIsLoading} onSubmitSignInForm={onSubmitSignInForm} />

        <FormQuestionBlock
          buttonTitle={t.signUpPage.title}
          linkHref={PATH.AUTH.SIGNUP}
          question={t.signInPage.accountQuestion}
        />
      </Card>
    </>
  )
}

SignIn.getLayout = getBaseLayout
export default SignIn
