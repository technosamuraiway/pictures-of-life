import { z } from 'zod'

const passwordRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
const usernameRegex = /^[a-zA-Z0-9_-]*$/g

// ----------- Схемы валидаций полей ---------------

interface IEmail {
  emailRequired: string
  emailScheme: string
}

interface INumberRange {
  maximumNumber: string
  minimumNumber: string
}

interface IPassword extends INumberRange {
  password: string
}

interface IUserName extends INumberRange {
  username: string
}

const email = (email: IEmail) => {
  return z.string().trim().min(1, email.emailRequired).email({ message: email.emailScheme })
}

const password = (password: IPassword) => {
  return z
    .string()
    .trim()
    .min(6, `${password.minimumNumber} 6`)
    .max(20, `${password.maximumNumber} 20`)
    .regex(passwordRegex, {
      message: `${password.password} 0-9, a-z, A-Z, ! # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^_\` { | } ~`,
    })
}

const username = (username: IUserName) => {
  return z
    .string()
    .trim()
    .min(6, `${username.minimumNumber} 6`)
    .max(30, `${username.maximumNumber} 30`)
    .regex(usernameRegex, {
      message: `${username.username} a-z, A-Z, 0-9, -`,
    })
}

const confirmPassword = z.string().trim()
const isAgree = z.boolean().refine(value => value)

// ============= Схемы валидаций форм ==================

export interface ISignUp {
  confirmPassword: string
  email: IEmail
  password: IPassword
  username: IUserName
}

export const signUpScheme = (signUp: ISignUp) => {
  return z
    .object({
      confirmPassword,
      email: email(signUp.email),
      isAgree,
      password: password(signUp.password),
      username: username(signUp.username),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: signUp.confirmPassword,
      path: ['confirmPassword'],
    })
}

// ============= Типы валидаций форм ==================
export type SignUpFormValues = z.infer<ReturnType<typeof signUpScheme>>
