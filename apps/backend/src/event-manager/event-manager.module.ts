import {Module} from '@nestjs/common'
import {EventManagerService} from './event-manager.service'

@Module({
  providers: [EventManagerService],
})
export class EventManagerModule {}
