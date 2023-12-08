import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon2 from 'argon2';
import { UserRepository } from './repository/user.repository';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException(
        'The password and confirm password do not match.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isEmailExist = await this.userRepository.getUserByEmail(
      createUserDto.email,
    );

    if (isEmailExist) {
      throw new HttpException(`Email is already taken!.`, HttpStatus.CONFLICT);
    }

    createUserDto.password = await argon2.hash(createUserDto.password);
    const newUser = await this.userRepository.addUser(createUserDto);
    delete newUser.password;
    return { statusCode: HttpStatus.CREATED, data: newUser };
  }

  async findOne(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    delete user.password;

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  async update(id: string, avatar: any, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    let fileLink = user.avatar;
    let filePath = user.pathAvatar;

    if (avatar != undefined) {
      fileLink = `http://${process.env.HOST}:${process.env.PORT}/api/avatar/${avatar.filename}`;
      filePath = avatar.path;
      if (user.pathAvatar != null) fs.unlinkSync(user.pathAvatar);
    }

    const newUser = await this.userRepository.updateUserById(
      id,
      fileLink,
      filePath,
      updateUserDto,
    );

    delete newUser.raw[0].password;

    return { statusCode: HttpStatus.OK, data: newUser.raw[0] };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.deleteUserById(id);

    if (user.affected == 0)
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: user.raw[0] };
  }
}
