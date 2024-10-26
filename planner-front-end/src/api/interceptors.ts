import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'
import { authService } from '../services/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json' // данные будут передаваться в формате JSON
  },
  withCredentials: true // указываем что работаем с серверными куками
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken)
    config.headers.Authirization = `Bearer ${accessToken}` // нужно для того, чтобы все запросы, сделанные с помощью axiosWithAuth, автоматически включали токен авторизации в заголовок

  return config
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status == 401 ||
        errorCatch(error) == 'jwt expired' ||
        errorCatch(error) == 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry // проверяет, была ли уже сделана повторная попытка запроса, если да то false
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) == 'jwt expired') removeFromStorage()
      }
    }
    throw error
  }
)

export { axiosClassic, axiosWithAuth }