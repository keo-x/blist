import {getRepositoryToken} from '@nestjs/typeorm'
import {MockModel} from '../../../database/test/MockModel'
import {User} from '../../entities/user.entity'
import {userStub} from '../subs/user.stub'

export const USER_REPOSITORY_TOKEN = getRepositoryToken(User)

export class UserModel extends MockModel<User> {
  protected entityStub = userStub()
}
