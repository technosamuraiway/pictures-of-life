import { toast } from 'react-toastify'

import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'

export interface IServerError {
  data?: DataType
}

type DataType = {
  error: string
  messages: Array<MessagesFromErrorType>
  path: string
  statusCode: number
}

export type MessagesFromErrorType = {
  field: string
  message: string
}

export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => next => action => {
  if (isRejected(action)) {
    const serverError = action.payload as IServerError

    // if (serverError.data?.error === 'Unauthorized') {
    //   return next(action)
    // }

    if (serverError.data?.statusCode === 400 || serverError.data?.statusCode === 401) {
      if (!Array.isArray(serverError.data?.messages)) {
        toast.error(serverError.data?.messages)
      }

      toast.error(serverError.data?.messages[0].message)
    }

    /* если нет ответа от сервера */
    if (!serverError.data) {
      toast.error('Network Error')
    }
  }

  return next(action)
}
