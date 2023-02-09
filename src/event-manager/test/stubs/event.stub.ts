import {Event} from '../../entities/event.entity'
import dayjs from 'dayjs'
import {ADMIN_UUID_STUBS} from '../../../users/test/subs/user.stub'

export const eventStub = (): Omit<Event, 'createdBy'> => {
  const now = dayjs()
  return {
    uuid: '123',
    name: 'dope party',
    createdByUuid: ADMIN_UUID_STUBS,
    date: now.add(7, 'days').toDate(),
    createdAt: now.toDate(),
    updatedAt: now.toDate(),
  }
}
