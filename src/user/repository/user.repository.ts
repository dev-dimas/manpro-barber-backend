import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async addUser(user: CreateUserDto) {
    return await this.repository.save(user);
  }

  async getAllUser() {
    return await this.repository.find();
  }

  async getUserById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async getUserByUsername(username: string) {
    return await this.repository.findOneBy({
      username,
    });
  }

  async updateUserById(id: string, user: UpdateUserDto) {
    return await this.repository
      .createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteUserById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}
