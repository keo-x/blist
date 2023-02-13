import {serialize} from 'cookie'
import {CookieOptions, Request, Response} from 'express'
/**
 * This sets `cookie` on `res` object
 */
const cookie = ({
  res,
  name,
  value,
  options = {},
}: {
  res: Response
  name: string
  value: unknown
  options?: CookieOptions
}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))

  return res
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler) => (req: Request, res: Response) => {
  res.cookie = (name: string, value: string, options: CookieOptions) =>
    cookie({res, name, value, options})

  return handler(req, res)
}

export default cookies
