import {UserEntity, UserRole} from '../../entities/user.entity'

export const ADMIN_UUID_STUBS = '325152'

export const userStub = ({uuid = '123'}: {uuid?: string}): UserEntity => {
  return {
    uuid,
    email: 'test@example.com',
    role: uuid === ADMIN_UUID_STUBS ? UserRole.ORGANIZER : UserRole.PROMOTER,
    displayName: 'test user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
