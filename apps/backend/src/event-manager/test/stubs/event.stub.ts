import {Event} from '../../entities/event.entity'
import dayjs from 'dayjs'

export const eventStub = (): Event => {
  const now = dayjs()
  return {
    uuid: '351465',
    name: 'dope party',
    date: now.add(7, 'days').toDate(),
    createdAt: now.toDate(),
    updatedAt: now.toDate(),
  }
}
