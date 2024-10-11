import { inctagramApi } from '@/services/api/inctagram.api'
import { ProfileAPI } from '@/services/api-SSG/profile.api'
import { PATH } from '@/shared'
import axios from 'axios'
import Router from 'next/router'

type UpdateTokenResponse = {
  accessToken: string
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL,
  withCredentials: true,
})

instance.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return request
  },
  error => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // originalRequest._retry = true - для избегания безконечных повторных запросов
    // => у меня не работает пришлось добавлять условие ниже
    if (error.response.status === 401 && !originalRequest.sent && !originalRequest._retry) {
      originalRequest._retry = true
      originalRequest.sent = true

      // останавливаем безконечный цикл
      if (originalRequest.url === 'v1/auth/update-tokens') {
        return
      }

      try {
        const refreshResult = await instance.post<UpdateTokenResponse>('v1/auth/update-tokens')

        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim())

          // повторяем упавший запрос
          return instance(originalRequest)
        }
      } catch (error) {
        // в AuthGuard есть проверка me запроса, data от me  кеше
        // если не очистить кеш, то роутер перенаправит на signin а там автоматически на home
        // => нужно очистить кеш перед перенаправлением
        inctagramApi.util.resetApiState()
        await Router.push(PATH.AUTH.SIGNIN)
      }
    }

    return Promise.reject(error)
  }
)

const profileAPI = new ProfileAPI(instance)

export const API = {
  profileAPI,
}
