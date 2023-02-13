import axios, {AxiosInstance} from 'axios'

export const createApiInstance = (): AxiosInstance => {
  const baseURL = process.env.DASHBOARD_URL

  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return api
}
