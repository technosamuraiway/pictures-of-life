import { useState } from 'react'

import { EmailSentModal, SignUpForm, useZodValidation } from '@/entities'
import { useSignUpMutation } from '@/services'
import { MetaHead } from '@/shared/components/metaHead/MetaHead'
import { QuestionBlock } from '@/shared/components/questionBlock/QuestionBlock'
import { SignInIcons } from '@/shared/components/signInIcons/SignInIcons'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { PATH } from '@/shared/utils/pathVariables'
import { Card } from '@technosamurai/techno-ui-kit'

import s from './SignUp.module.scss'

export default function SignUp() {
  const t = useRouterLocaleDefinition()
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState('YourEmail@gmail.com')
  const { values } = useZodValidation()

  const [signUp, { isLoading: SignUpIsLoading }] = useSignUpMutation()

  const signUpSubmitHandler = (data: typeof values.signUp, resetForm: () => void) => {
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

  const onClickCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <MetaHead title={t.signUpPage.title} />
      <Card className={s.cardContainer}>
        <SignInIcons
          gitHubTitle={t.signUpPage.gitHubLinkTitle}
          googleTitle={t.signUpPage.googleLinkTitle}
          pageTitle={t.signUpPage.title}
        />
        <SignUpForm buttonDisabled={SignUpIsLoading} onSubmit={signUpSubmitHandler} />
        <QuestionBlock
          buttonTitle={t.signInPage.title}
          linkHref={PATH.AUTH.SIGNIN}
          question={t.signUpPage.haveAccountQuestion}
        />
      </Card>
      <EmailSentModal
        email={email}
        isOpen={openModal}
        onClickCloseModalHandler={onClickCloseModal}
      />
    </>
  )
}
