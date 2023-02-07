import {User, UserRole} from '../../entities/user.entity'

export const userStub = (): User => {
  return {
    uuid: '123',
    email: 'test@example.com',
    role: UserRole.PROMOTER,
    displayName: 'test user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
