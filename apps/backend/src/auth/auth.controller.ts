import {BadRequestException, Controller, Post, Req, Res} from '@nestjs/common'
import {UserService} from '../users/users.service'
import {Request, Response} from 'express'
import {isNil} from 'rambda'
import {MagicLinkStrategy} from './strategies/magic-link.strategy'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly magicLinkStrategy: MagicLinkStrategy
  ) {}

  @Post('send-link')
  async sendLink(@Req() req: Request, @Res() res: Response) {
    const email = req.body.destination as string | undefined
    if (isNil(email)) {
      throw new BadRequestException('missing destination email')
    }
    const user = this.userService.findByEmail({email})

    if (!isNil(user)) {
      return this.magicLinkStrategy.send(req, res)
    }
    return res.send(200)
  }
}
