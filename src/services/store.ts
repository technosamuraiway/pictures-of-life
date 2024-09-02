import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { rtkQueryErrorLogger } from './AppErrorHandler'
import { inctagramApi } from './api/inctagram.api'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(inctagramApi.middleware, rtkQueryErrorLogger),
    reducer: {
      [inctagramApi.reducerPath]: inctagramApi.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
