import { ProfileAPI } from '@/services/api-SSG/profile.api'
import axios from 'axios'

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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      console.log('❤❤❤❤❤')
    }

    return Promise.reject(error)
  }
)

const profileAPI = new ProfileAPI(instance)

export const API = {
  profileAPI,
}
