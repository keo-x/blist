import {NextApiRequest, NextApiResponse} from 'next'
import {createApiInstance} from '../../service/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {headers} = req
  const api = createApiInstance()
  try {
    const {data, headers: returnedHeaders} = await api.post(
      '/auth/refresh-token', // refresh token Node.js server path
      undefined,
      {
        headers,
      }
    )

    //  Update headers on requester using headers from Node.js server response
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    )

    res.status(200).json(data)
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error)
  }
}
