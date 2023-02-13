import {getRepositoryToken} from '@nestjs/typeorm'
import {MockModel} from '../../../database/test/MockModel'
import {UserEntity} from '../../entities/user.entity'
import {userStub} from '../subs/user.stub'

export const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity)

export class UserModel extends MockModel<UserEntity> {
  protected entityStub = userStub({})
}
