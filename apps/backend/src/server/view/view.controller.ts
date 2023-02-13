import {Controller, Get, Res, Req} from '@nestjs/common'
import {Request, Response} from 'express'
import {parse} from 'url'
import {Public} from '../app/common/decorators'

import {ViewService} from './view.service'

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Public()
  @Get('login')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler()
    handle(req, res)
  }

  @Public()
  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true)
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname!, parsedUrl.query)
  }

  @Public()
  @Get('api/auth/*')
  public async auth(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true)
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname!, parsedUrl.query)
  }
}
