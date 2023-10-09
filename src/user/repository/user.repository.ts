import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async addUser(user: CreateUserDto) {
    return await this.save(user);
  }

  async getAllUser() {
    return await this.find();
  }

  async getUserById(id: string) {
    return await this.query('Select * From users Where id = $1', [id]);
  }

  async getUserByUsername(username: string) {
    return await this.findOneBy({
      username,
    });
  }

  async updateUserById(id: string, user: UpdateUserDto) {
    return await this.createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteUserById(id: string) {
    return await this.delete({
      id,
    });
  }
}
