import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.username = createUserDto.username.toLowerCase();

    const isUsernameExist = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (isUsernameExist) {
      throw new HttpException(
        `Username @${createUserDto.username} is already taken!.`,
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = await argon2.hash(createUserDto.password);
    const newUser = await this.userRepository.save(createUserDto);
    delete newUser.password;
    return { statusCode: HttpStatus.CREATED, data: newUser };
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    delete user.password;

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${username} user`;
  }
}
