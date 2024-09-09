import { useState } from 'react'

import { EmailSentModal, SignUpForm, SignUpFormValues } from '@/entities'
import { OAuth } from '@/entities/auth/oAuth'
import { useSignUpMutation } from '@/services'
import {
  FormQuestionBlock,
  MetaHead,
  PATH,
  RequestLineLoader,
  useRouterLocaleDefinition,
} from '@/shared'
import { Card } from '@technosamurai/techno-ui-kit'

import s from './SignUp.module.scss'

export default function SignUp() {
  const t = useRouterLocaleDefinition()
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState('YourEmail@gmail.com')

  const [signUp, { isLoading: SignUpIsLoading }] = useSignUpMutation()

  const signUpSubmitHandler = (data: SignUpFormValues, resetForm: () => void) => {
    setEmail(data.email)
    signUp({
      email: data.email,
      password: data.password,
      userName: data.username,
    })
      .unwrap()
      .then(() => {
        setOpenModal(true)
        resetForm()
      })
  }

  const onClickCloseModalHandler = () => {
    setOpenModal(false)
  }

  return (
    <>
      {SignUpIsLoading && <RequestLineLoader />}
      <MetaHead title={t.signUpPage.title} />
      <Card className={s.cardContainer}>
        <OAuth />
        <SignUpForm isButtonDisabled={SignUpIsLoading} onSubmitSignUpForm={signUpSubmitHandler} />
        <FormQuestionBlock
          buttonTitle={t.signInPage.title}
          linkHref={PATH.AUTH.SIGNIN}
          question={t.signUpPage.haveAccountQuestion}
        />
      </Card>
      <EmailSentModal
        email={email}
        isOpen={openModal}
        onClickCloseModal={onClickCloseModalHandler}
      />
    </>
  )
}
