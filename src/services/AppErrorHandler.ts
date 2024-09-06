import { toast } from 'react-toastify'

import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'

interface IServerError {
  data?: {
    error: string
    messages: Array<{ field: string; message: string }>
    statusCode: number
  }
}

export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => next => action => {
  if (isRejected(action)) {
    const serverError = action.payload as IServerError

    // /* если не связанно с auth + есть ответ от сервера */
    // if (!(serverError.data?.statusCode === 401) && serverError.data) {
    //   console.log(serverError.data?.messages[0].message || 'An error occurred')
    // }

    /* если ошибка относится к auth + есть ответ от сервера */
    if (serverError.data?.statusCode === 400) {
      toast.error(serverError.data?.messages[0].message)
    }

    /* если ошибка относится к auth + есть ответ от сервера */
    if (serverError.data?.statusCode === 500) {
      if (serverError.data?.messages[0].message.includes('(`email`)')) {
        toast.error('User with this email is already registered')
      } else if (serverError.data?.messages[0].message.includes('(`userName`)')) {
        toast.error('User with this username is already registered')
      }
    }
    /* если нет ответа от сервера */
    if (!serverError.data) {
      toast.error('Network Error')
    }
  }

  return next(action)
}
