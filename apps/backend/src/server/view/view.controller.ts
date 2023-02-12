import {Controller, Get, Res, Req} from '@nestjs/common'
import {Request, Response} from 'express'
import {Public} from '../app/common/decorators'

import {ViewService} from './view.service'

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Public()
  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler()
    handle(req, res)
  }
}
