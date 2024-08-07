import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../src/user/entities/user.entity';

@Injectable()
export class UserTableTestHelper {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async addUser({
    password = 'andi123',
    email = 'andi123@gmail.com',
    name = 'andi',
    phone = '081234876945',
    avatar = null,
    point = 0,
    isActive = true,
  }) {
    return await this.repository.save({
      password,
      email,
      name,
      phone,
      avatar,
      point,
      isActive,
    });
  }

  async getAllUser() {
    return await this.repository.find();
  }

  async findUserById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async deleteUserById(id: string) {
    return await this.repository.delete({
      id,
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM users WHERE 1=1');
  }
}
