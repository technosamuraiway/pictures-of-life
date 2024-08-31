import { SignUpForm } from '@/entities'
import { useZodValidation } from '@/entities/hooks/useZodValidation'
import { MetaHead } from '@/shared/components/metaHead/MetaHead'
import { QuestionBlock } from '@/shared/components/questionBlock/QuestionBlock'
import { SignInIcons } from '@/shared/components/signInIcons/SignInIcons'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Card } from '@technosamurai/techno-ui-kit'

import s from './SignUp.module.scss'

export default function SignUp() {
  const t = useRouterLocaleDefinition()
  const { values } = useZodValidation()

  const signUpSubmitHandler = (data: typeof values.signUp) => {
    console.log(data)
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
        <SignUpForm onSubmit={signUpSubmitHandler} />
        <QuestionBlock
          buttonTitle={t.signInPage.title}
          linkHref={'/'}
          question={t.signUpPage.haveAccountQuestion}
        />
      </Card>
    </>
  )
}
