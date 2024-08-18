import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { hashPassword } from 'src/utils/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await hashPassword(createUserDto.password);
    }
    const user = await this.userRepository.create(createUserDto);
    await this.em.flush();
    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    const user = await this.findOne(id);
    wrap(user).assign(updateUserDto);
    await this.em.flush();

    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.userRepository.nativeDelete({
      id,
    });

    return id;
  }
}
