import {Test, TestingModule} from '@nestjs/testing'
import {UsersResolver} from '../users.resolver'
import {UserService} from '../users.service'
import {UserModel, USER_REPOSITORY_TOKEN} from './support/user.model'

describe('UsersResolver', () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserModel,
        },
      ],
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
