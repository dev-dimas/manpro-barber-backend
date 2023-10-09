import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../user/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '7 days' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, UserRepository],
})
export class LoginModule {}
