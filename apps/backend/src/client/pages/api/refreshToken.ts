import {NextApiRequest, NextApiResponse} from 'next'
import {refreshTokens} from '../../service/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {headers} = req
  try {
    const {data, headers: returnedHeaders} = await refreshTokens(headers)

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
