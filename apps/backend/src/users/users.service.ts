import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {isNil} from 'rambda'
import {Repository} from 'typeorm'
import {UpdateUserInput} from './dto/update-user.input'
import {User} from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[] | null> {
    return await this.usersRepository.find()
  }

  async findOne({uuid}: {uuid: string}): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      uuid,
    })
  }

  async update({
    uuid,
    updateUserInput,
  }: {
    uuid: string
    updateUserInput: UpdateUserInput
  }) {
    const user = await this.findOne({uuid})
    if (isNil(user)) {
      return null
    }
    const updatedUser = {
      ...user,
      updateUserInput,
    }

    return this.usersRepository.save(updatedUser)
  }
}
