import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon2 from 'argon2';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.username = createUserDto.username.toLowerCase();

    const isUsernameExist = await this.userRepository.getUserByUsername(
      createUserDto.username,
    );

    if (isUsernameExist) {
      throw new HttpException(
        `Username @${createUserDto.username} is already taken!.`,
        HttpStatus.CONFLICT,
      );
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

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }
}
