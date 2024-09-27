import { useState } from 'react'
import { toast } from 'react-toastify'

import { OAuth, SignInForm, SignInFormValues } from '@/entities'
import { useMeCurInfoQuery, useSignInMutation } from '@/services'
import {
  FormQuestionBlock,
  MetaHead,
  PATH,
  RequestLineLoader,
  useRouterLocaleDefinition,
} from '@/shared'
import { getBaseLayout } from '@/widgets'
import { Card } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

function SignIn() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const [signIn, { isLoading: SignInIsLoading }] = useSignInMutation()
  const { data: meData } = useMeCurInfoQuery()
  const [textFieldError, setTextFieldError] = useState<string>()

  const onSubmitSignInForm = async (data: SignInFormValues) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      }).unwrap()

      toast.success(t.signInPage.successLogIn)

      router.replace(`${PATH.PROFILE.BASEPROFILE}/${meData?.userId}`)
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
          buttonDisabled={SignInIsLoading}
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
