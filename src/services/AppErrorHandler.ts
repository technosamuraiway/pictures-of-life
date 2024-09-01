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
  }

  if (isRejected(action)) {
    const serverError = action.payload as ServerError

    // /* если не связанно с auth + есть ответ от сервера */
    // if (!(serverError.data?.statusCode === 401) && serverError.data) {
    //   console.log(serverError.data?.messages[0].message || 'An error occurred')
    // }

    /* если ошибка относится к auth + есть ответ от сервера */
    if (serverError.data?.statusCode === 400) {
      console.log(serverError.data?.error)
      console.log(serverError.data?.messages[0].message)
    }

    /* если нет ответа от сервера */
    if (!serverError.data) {
      console.log('Network Error')
    }
  }

  return next(action)
}
