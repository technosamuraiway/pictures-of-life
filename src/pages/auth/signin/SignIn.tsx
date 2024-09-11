import { OAuth, SignInForm, SignInFormValues } from '@/entities'
import { authService } from '@/services/flow/auth.service'
import {
  MetaHead,
  PATH,
  QuestionBlock,
  RequestLineLoader,
  useRouterLocaleDefinition,
} from '@/shared'
import { Card } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

export default function SignIn() {
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

        localStorage.setItem('accessToken', accessToken)

        resetForm()
        router.push('/')
      })
  }

  return (
    <>
      {SignInIsLoading && <RequestLineLoader />}
      <MetaHead title={t.signInPage.title} />
      <Card className={s.cardContainer}>
        <OAuth title={t.signInPage.title} />

        <SignInForm buttonDisabled={SignInIsLoading} onSubmitSignInForm={onSubmitSignInForm} />

        <QuestionBlock
          buttonTitle={t.signUpPage.title}
          linkHref={PATH.AUTH.SIGNUP}
          question={t.signInPage.accountQuestion}
        />
      </Card>
    </>
  )
}
