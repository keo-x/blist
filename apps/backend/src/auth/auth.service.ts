import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import {User} from '../users/entities/user.entity'

export type LoginReturnType = {
  accessToken: string
  refreshToken: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  private generateAccessToken(user: User): string {
    return this.jwtService.sign(
      {sub: user.uuid},
      {
        expiresIn: '15m',
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      }
    )
  }

  private generateRefreshToken(user: User): string {
    return this.jwtService.sign(
      {sub: user.uuid},
      {
        expiresIn: '7d',
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      }
    )
  }

  login(user: User): LoginReturnType {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    }
  }
}
