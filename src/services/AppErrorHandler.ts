import { toast } from 'react-toastify'

import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'

export interface IServerError {
  data?: DataType
}

type DataType = {
  error: string
  messages: Array<MessagesFromErrorType>
  statusCode: number
}

export type MessagesFromErrorType = {
  field: string
  message: string
}

export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => next => action => {
  if (isRejected(action)) {
    const serverError = action.payload as IServerError

    // /* если не связанно с auth + есть ответ от сервера */
    if (!(serverError.data?.statusCode === 401) && serverError.data) {
      toast.error(serverError.data?.messages[0].message)
    }

    if (serverError.data?.statusCode === 400 || serverError.data?.statusCode === 401) {
      toast.error(serverError.data?.messages[0].message)
    }

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
