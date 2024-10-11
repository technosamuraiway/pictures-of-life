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

instance.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
})

instance.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    // originalRequest._retry = true - для избегания отлавнивания|осуществления безконечных повторных запросов
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResult = await instance.post<UpdateTokenResponse>('v1/auth/update-tokens')

        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim())

          // повторяем упавший запрос
          return instance(originalRequest)
        } else {
          await Router.push(PATH.AUTH.SIGNIN)
        }
      } finally {
        console.log('error')
      }
    }

    return Promise.reject(error)
  }
)

const profileAPI = new ProfileAPI(instance)

export const API = {
  profileAPI,
}
