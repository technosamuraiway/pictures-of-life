import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { z } from 'zod'

export const useZodValidation = () => {
  const t = useRouterLocaleDefinition()

  const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
  const usernameRegex = /^[a-zA-Z0-9_-]*$/g
  // ----------- Схемы валидаций полей ---------------
  const email = z
    .string()
    .trim()
    .min(1, t.validationSchemes.emailRequired)
    .email({ message: t.validationSchemes.emailScheme })

  const password = z
    .string()
    .trim()
    .min(6, `${t.validationSchemes.minimumNumber} 6`)
    .max(20, `${t.validationSchemes.maximumNumber} 20`)
    .regex(passwordRegex, {
      message: `${t.validationSchemes.password} 0-9, a-z, A-Z, ! # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^_\` { | } ~`,
    })

  const username = z
    .string()
    .trim()
    .min(6, `${t.validationSchemes.minimumNumber} 6`)
    .max(30, `${t.validationSchemes.maximumNumber} 30`)
    .regex(usernameRegex, {
      message: `${t.validationSchemes.username} a-z, A-Z, 0-9, -`,
    })

  const confirmPassword = z.string().trim()
  const isAgree = z.boolean().refine(value => value)

  // ============= Схемы валидаций форм ==================

  // const createNewPassword = z.object({ password })
  // const forgotPassword = z.object({ email })
  // const signIn = z.object({ email, password, rememberMe: z.boolean() })

  const signUp = z
    .object({
      confirmPassword,
      email,
      isAgree,
      password,
      username,
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t.validationSchemes.confirmPassword,
      path: ['confirmPassword'],
    })

  // ============= Типы валидаций форм ==================
  //   type CreateNewPasswordFormValues = z.infer<typeof createNewPassword>
  //   type ForgotPasswordFormValues = z.infer<typeof forgotPassword>
  //   type SignInFormValues = z.infer<typeof signIn>
  type SignUpFormValues = z.infer<typeof signUp>

  return {
    authSchemes: {
      // createNewPassword,
      // forgotPassword,
      // signIn,
      signUp,
    },
    values: {
      signUp: undefined as unknown as SignUpFormValues,
    },
  }
}
