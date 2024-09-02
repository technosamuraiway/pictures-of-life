import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'

interface ServerError {
  data?: {
    error: string
    messages: Array<{ field: string; message: string }>
    statusCode: number
  }
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (api) {
    // console.log('Api')
  }

  if (isRejected(action)) {
    const serverError = action.payload as ServerError

    // /* если не связанно с auth + есть ответ от сервера */
    // if (!(serverError.data?.statusCode === 401) && serverError.data) {
    //   console.log(serverError.data?.messages[0].message || 'An error occurred')
    // }

    /* если ошибка относится к auth + есть ответ от сервера */
    if (serverError.data?.statusCode === 400) {
      // console.log(serverError.data?.error)
      // console.log(serverError.data?.messages[0].message)
    }

    /* если ошибка относится к auth + есть ответ от сервера */
    if (serverError.data?.statusCode === 500) {
      if (serverError.data?.messages[0].message.includes('(`email`)')) {
        // console.log('User with this email is already registered')
      } else if (serverError.data?.messages[0].message.includes('(`userName`)')) {
        // console.log('User with this username is already registered')
      }
    }
    /* если нет ответа от сервера */
    if (!serverError.data) {
      // console.log('Network Error')
    }
  }

  return next(action)
}
