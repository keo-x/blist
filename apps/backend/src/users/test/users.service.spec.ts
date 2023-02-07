import {Test, TestingModule} from '@nestjs/testing'
import {UserService} from '../users.service'
import {UserModel, USER_REPOSITORY_TOKEN} from './support/user.model'

describe('UsersService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserModel,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
