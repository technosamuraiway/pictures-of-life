import { z } from 'zod'

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}])[0-9a-zA-Z!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}]{6,}$/

const usernameRegex = /^[a-zA-Z0-9_-]*$/g
const firstLastNameRegex = /^[a-zA-Zа-яА-Я]*$/g
const aboutMeRegex = /^[a-zA-Zа-яА-Я0-9!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}]*$/g

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

interface IName extends INumberRange {
  name: string
}

interface IAboutMe extends INumberRange {
  aboutMe: string
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

const firstLastName = (firstLastName: IName) => {
  return z
    .string()
    .trim()
    .min(1, `${firstLastName.minimumNumber} 1`)
    .max(50, `${firstLastName.maximumNumber} 50`)
    .regex(firstLastNameRegex, {
      message: `${firstLastName.name} a-z, A-Z, а-я, А-Я`,
    })
}

const aboutMe = (aboutMe: IAboutMe) => {
  return z
    .string()
    .trim()
    .min(0, `${aboutMe.minimumNumber} 0`)
    .max(200, `${aboutMe.maximumNumber} 200`)
    .regex(aboutMeRegex, {
      message: `${aboutMe.aboutMe} a-z, A-Z, а-я, А-Я 0-9, ! # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^_\` { | } ~`,
    })
}

const confirmPassword = z.string().trim()
const isBoolean = z.boolean().refine(value => value)

// ============= Схемы валидаций форм ==================

export interface ISignUp {
  confirmPassword: string
  email: IEmail
  password: IPassword
  username: IUserName
}

export interface ISignIn {
  email: IEmail
  password: IPassword
}

export interface IForgotPassword {
  email: IEmail
  recaptcha?: string
}

export interface ICreateNewPassword {
  confirmPassword: string
  newPassword: IPassword
}

export interface IProfile {
  aboutMe: IAboutMe
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: IName
  lastName: IName
  region?: string
  userName: IUserName
}

export const signUpScheme = (signUp: ISignUp) => {
  return z
    .object({
      confirmPassword,
      email: email(signUp.email),
      isAgree: isBoolean,
      password: password(signUp.password),
      username: username(signUp.username),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: signUp.confirmPassword,
      path: ['confirmPassword'],
    })
}

export const forgotPasswordScheme = (forgotPassword: IForgotPassword) => {
  return z.object({
    email: email(forgotPassword.email),
    recaptcha: z.string(),
  })
}

export const createNewPasswordScheme = (createNewPassword: ICreateNewPassword) => {
  return z
    .object({
      confirmPassword,
      newPassword: password(createNewPassword.newPassword),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: createNewPassword.confirmPassword,
      path: ['confirmPassword'],
    })
}

export const signInScheme = (signIn: ISignIn) => {
  return z.object({
    email: email(signIn.email),
    password: password(signIn.password),
  })
}

export const profileValidationScheme = (profile: IProfile) => {
  return z.object({
    aboutMe: aboutMe(profile.aboutMe),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().optional(),
    firstName: firstLastName(profile.firstName),
    lastName: firstLastName(profile.lastName),
    region: z.string().optional(),
    userName: username(profile.userName),
  })
}

// ============= Типы валидаций форм ==================
export type SignUpFormValues = z.infer<ReturnType<typeof signUpScheme>>
export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordScheme>>
export type CreateNewPasswordFormValues = z.infer<ReturnType<typeof createNewPasswordScheme>>
export type SignInFormValues = z.infer<ReturnType<typeof signInScheme>>
export type ProfileFormValues = z.infer<ReturnType<typeof profileValidationScheme>>
