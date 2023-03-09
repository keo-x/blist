import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'

export const ACCESS_TOKEN_STRATEGY = 'jwt-access'
export class AccessTokenStategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    })
  }

  async validate(payload: {sub: string}) {
    return {uuid: payload.sub}
  }
}
