import {Module} from '@nestjs/common'
import {EventManagerService} from './event-manager.service'
import {EventManagerResolver} from './event-manager.resolver'
import {UsersModule} from '../users/users.module'
import {Event} from './entities/event.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule],
  providers: [EventManagerService, EventManagerResolver],
})
export class EventManagerModule {}
