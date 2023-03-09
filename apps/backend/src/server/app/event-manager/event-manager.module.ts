import {Module} from '@nestjs/common'
import {EventManagerService} from './event-manager.service'
import {EventManagerResolver} from './event-manager.resolver'
import {UsersModule} from '../users/users.module'
import {Event} from './entities/event.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Guest} from './entities/guest.entity'
import {GuestResolver} from './guest.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Event, Guest]), UsersModule],
  providers: [EventManagerService, EventManagerResolver, GuestResolver],
})
export class EventManagerModule {}
