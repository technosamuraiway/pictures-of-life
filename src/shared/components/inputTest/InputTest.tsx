// import React, { forwardRef, useId, useState } from 'react'
//
// import { HideIcon, SearchIcon, ShowIcon } from '@/apps'
// import { Typography } from '@/shared'
// import { InputProps } from '@/shared/ui/text-field/model/text-field-types'
// import { Variant } from '@/shared/ui/typography/lib'
// import { clsx } from 'clsx'
//
// const InputTypes = {
//   CYRILLIC_AND_LATIN: 'cyrillic_and_latin',
//   LETTERS_ONLY: 'letters_only',
//   NUMERIC: 'numeric',
//   PASSWORD: 'password',
//   SEARCH: 'search',
//   TEXT: 'text',
// } as const
//
// import { ComponentPropsWithoutRef } from 'react'
//
// import { InputTypes } from '@/shared/ui/text-field/lib/constants/input-type-enum'
//
// export type InputProps = {
//   error?: string
//   inputType?: (typeof InputTypes)[keyof typeof InputTypes]
//   label?: string
//   required?: boolean
// } & Omit<ComponentPropsWithoutRef<'input'>, 'type'>
//
// export const TextField = forwardRef<HTMLInputElement, InputProps>(
//   (
//     { className, disabled, error, inputType = InputTypes.TEXT, label, required = false, ...rest },
//     ref
//   ) => {
//     const id = useId()
//     const finalId = rest.id || id
//     const [showPassword, setShowPassword] = useState(false)
//
//     const textFieldNames = ['userName', 'email', 'password', 'confirmPassword']
//
//     const classNames = {
//       container: clsx(s.inputContainer),
//       error: clsx(error && s.error),
//       input: clsx(s.input, s[`${inputType}`], error && s.inputError, disabled && s.disabled),
//       label: clsx(s.label),
//       leftIcon: clsx(s.leftIcon),
//       rightIcon: clsx(s.rightIcon),
//       root: clsx(s.root, className, disabled && s.disabled),
//     }
//
//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (
//         inputType === InputTypes.LETTERS_ONLY &&
//         !/^[a-zA-Z-]+$/.test(event.key) &&
//         event.key !== 'Backspace' &&
//         event.key !== 'Tab'
//       ) {
//         event.preventDefault()
//       }
//       if (
//         inputType === InputTypes.NUMERIC &&
//         !/^[0-9]+$/.test(event.key) &&
//         event.key !== 'Backspace' &&
//         event.key !== 'Tab'
//       ) {
//         event.preventDefault()
//       }
//       if (inputType === InputTypes.NUMERIC) {
//         if (
//           event.currentTarget.value.length >= 6 &&
//           event.key !== 'Backspace' &&
//           event.key !== 'Tab'
//         ) {
//           event.preventDefault()
//         }
//       }
//       if (rest.name ? textFieldNames.includes(rest.name) : false) {
//         if (event.key === ' ' || event.code === 'Space') {
//           event.preventDefault()
//         }
//       }
//       if (inputType === InputTypes.CYRILLIC_AND_LATIN) {
//         if (
//           !/^[a-zA-Zа-яА-Я-]+$/.test(event.key) &&
//           event.key !== 'Backspace' &&
//           event.key !== 'Tab'
//         ) {
//           event.preventDefault()
//         }
//       }
//     }
//
//     const showHidePassword = () => {
//       if (!disabled) {
//         setShowPassword(!showPassword)
//       }
//     }
//
//     const rightIcon = inputType === InputTypes.PASSWORD && (
//       <button
//         className={s.rightIcon}
//         disabled={disabled}
//         onClick={showHidePassword}
//         type={'button'}
//       >
//         {showPassword ? <HideIcon /> : <ShowIcon />}
//       </button>
//     )
//
//     const leftIcon = inputType === InputTypes.SEARCH && (
//       <div className={classNames.leftIcon} id={'left-icon'}>
//         {<SearchIcon />}
//       </div>
//     )
//
//     const type = showPassword && inputType === InputTypes.PASSWORD ? InputTypes.TEXT : inputType
//
//     const inputMode = inputType === InputTypes.NUMERIC ? 'numeric' : 'text'
//
//     return (
//       <div className={classNames.root}>
//         {label && (
//           <Typography
//             as={'label'}
//             className={classNames.label}
//             htmlFor={finalId}
//             variant={Variant.caption}
//           >
//             {label}
//             {required && <span className={s.required}>*</span>}
//           </Typography>
//         )}
//         <div className={classNames.container}>
//           <input
//             aria-label={label}
//             className={classNames.input}
//             disabled={disabled}
//             id={finalId}
//             inputMode={inputMode}
//             onKeyDown={handleKeyDown}
//             ref={ref}
//             type={type === InputTypes.LETTERS_ONLY || type === InputTypes.NUMERIC ? 'text' : type}
//             {...rest}
//           />
//           {leftIcon}
//           {rightIcon}
//         </div>
//         {error && (
//           <Typography className={classNames.error} variant={Variant.body_2}>
//             {error}
//           </Typography>
//         )}
//       </div>
//     )
//   }
// )
