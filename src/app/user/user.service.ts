/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity> 
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'email'],
    });
  }

  async findOneOrFail(id: string) { // Use id directly as argument
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail(id);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: string) {
    await this.findOneOrFail(id);
    return await this.userRepository.softDelete(id);
  }
}
