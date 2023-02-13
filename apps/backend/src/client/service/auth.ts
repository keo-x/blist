import axios from 'axios'

export const sendUserLink = async ({destination}: {destination: string}) => {
  const response = await axios.post('http://localhost:3333/auth/send-link', {
    destination,
  })

  return response
}
