import axios from 'axios'
import {createApiInstance} from './api'

const api = createApiInstance()

export const sendUserLink = async ({destination}: {destination: string}) => {
  const response = await axios.post('/auth/send-link', {
    destination,
  })

  return response
}

export const verifyAuthToken = async ({token}: {token?: string}) => {
  return await api.request({
    url: 'http://localhost:3333/auth/verify',
    method: 'post',
    params: {
      token,
    },
  })
}
