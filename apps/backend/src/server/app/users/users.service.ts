import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {isNil} from 'rambda'
import {Repository} from 'typeorm'
import {UpdateUserInput} from './dto/update-user.input'
import {UserEntity} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[] | null> {
    return await this.usersRepository.find()
  }

  async findById({uuid}: {uuid: string}): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({
      uuid,
    })
  }

  async findByIdOrFail({uuid}: {uuid: string}): Promise<UserEntity> {
    return await this.usersRepository.findOneByOrFail({
      uuid,
    })
  }

  async findByEmail({email}: {email: string}): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({
      email,
    })
  }

  async update({
    uuid,
    updateUserInput,
  }: {
    uuid: string
    updateUserInput: UpdateUserInput
  }) {
    const user = await this.findById({uuid})
    if (isNil(user)) {
      return null
    }
    const updatedUser = {
      ...user,
      ...updateUserInput,
    }

    return this.usersRepository.save(updatedUser)
  }
}
