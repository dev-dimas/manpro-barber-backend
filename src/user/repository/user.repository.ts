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
    return await this.repository.save({
      password: user.password,
      email: user.email,
      name: user.name,
      phone: user.phone,
    });
  }

  async getAllUser() {
    return await this.repository.find();
  }

  async getUserById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async getUserByEmail(email: string) {
    return await this.repository.findOneBy({
      email,
    });
  }

  async updateUserById(
    id: string,
    avatar: string,
    path: string,
    user: UpdateUserDto,
  ) {
    return await this.repository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        email: user.email,
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        birthdayDate: user.birthdayDate,
        address: user.address,
        avatar,
        pathAvatar: path,
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async changePassword(id: string, password: string) {
    return await this.repository.update({ id }, { password });
  }

  async deleteUserById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}
