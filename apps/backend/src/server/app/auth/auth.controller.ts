import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {UserService} from '../users/users.service'
import {Request, Response} from 'express'
import {isNil} from 'rambda'
import {MagicLinkStrategy} from './strategies/magic-link.strategy'
import {Public} from '../common/decorators/'
import {MagicLinkGuard} from '../common/guards'
import {UserEntity} from '../users/entities/user.entity'
import {AuthService} from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly magicLinkStrategy: MagicLinkStrategy
  ) {}

  @Public()
  @Post('send-link')
  async sendLink(@Req() req: Request, @Res() res: Response) {
    const email = req.body.destination as string | undefined
    if (isNil(email)) {
      throw new BadRequestException('missing destination email')
    }
    const user = await this.userService.findByEmail({email})

    if (!isNil(user)) {
      return this.magicLinkStrategy.send(req, res)
    }
    return res.sendStatus(200)
  }

  @Public()
  @UseGuards(MagicLinkGuard)
  @Post('verify')
  async verifyAuthToken(@Req() req: Request, @Res() res: Response) {
    if (isNil(req.user)) {
      throw new UnauthorizedException()
    }

    const {accessToken, refreshToken} = this.authService.login(
      req.user as UserEntity
    )

    // TODO extract and add the necessarry security setting
    res.cookie('racc', refreshToken, {
      httpOnly: true,
    })

    return res.send({
      accessToken,
      refreshToken,
    })
  }
}
