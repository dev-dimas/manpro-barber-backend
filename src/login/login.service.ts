import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getLogged(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });

    if (!user) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await argon2.verify(
      user.password,
      loginDto.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;
    const accessToken = await this.jwtService.signAsync({ user });
    return { statusCode: HttpStatus.OK, accessToken };
  }
}
