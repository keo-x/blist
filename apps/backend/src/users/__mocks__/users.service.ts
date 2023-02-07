import {userStub} from '../test/subs/user.stub'

export const UserService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findById: jest.fn().mockResolvedValue(userStub()),
  findByEmail: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
})
