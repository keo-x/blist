import {IncomingHttpHeaders} from 'http'
import api from './api'

export const sendUserLink = async ({destination}: {destination: string}) => {
  const response = await api.post('/auth/send-link', {
    destination,
  })

  return response
}

export const verifyAuthToken = async ({token}: {token?: string}) => {
  return await api.post('/auth/verify', undefined, {
    params: {
      token,
    },
  })
}

export const refreshTokens = async (headers: IncomingHttpHeaders) => {
  return api.post('/auth/refresh-token', undefined, {
    headers,
  })
}
