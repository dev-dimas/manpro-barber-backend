import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repository/user.repository';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EmployeeEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, UserRepository, EmployeeRepository],
})
export class LoginModule {}
