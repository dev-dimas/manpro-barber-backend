import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto';
import * as argon2 from 'argon2';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getLogged(loginDto: LoginDto) {
    const user = await this.userRepository.getUserByUsername(loginDto.username);

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
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: 'user',
    });
    return { statusCode: HttpStatus.OK, accessToken };
  }
}
