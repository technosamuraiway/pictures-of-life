import { useState } from 'react'
import { toast } from 'react-toastify'

import { OAuth, SignInForm, SignInFormValues } from '@/entities'
import { useLazyMeCurInfoQuery, useSignInMutation } from '@/services'
import {
  FormQuestionBlock,
  MetaHead,
  PATH,
  RequestLineLoader,
  useRouterLocaleDefinition,
} from '@/shared'
import { getBaseLayout } from '@/widgets'
import { Card } from '@technosamurai/techno-ui-kit'

import s from './SignIn.module.scss'

function SignIn() {
  const t = useRouterLocaleDefinition()

  const [signIn, { isLoading: SignInIsLoading }] = useSignInMutation()
  const [me] = useLazyMeCurInfoQuery()
  const [textFieldError, setTextFieldError] = useState<string>()

  const onSubmitSignInForm = async (data: SignInFormValues) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      }).unwrap()

      // чтобы пройти AuthGuard
      await me()

      // replace не подадопиться, так как переадрессация будет  в AuthGuard

      toast.success(t.signInPage.successLogIn)
    } catch (err: any) {
      if (err.data) {
        setTextFieldError('The email or password are incorrect. Try again please')
      }
    }
  }

  return (
    <>
      {SignInIsLoading && <RequestLineLoader />}
      <MetaHead title={t.signInPage.title} />
      <Card className={s.cardContainer}>
        <OAuth title={t.signInPage.title} />

        <SignInForm
          // buttonDisabled={SignInIsLoading}
          onSubmitSignInForm={onSubmitSignInForm}
          textFieldError={textFieldError}
        />

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
