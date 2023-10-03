import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginEmployeeController } from './login.employee.controller';
import { LoginEmployeeService } from './login.employee.service';
import { EmployeeRepository } from '../../employee/repository/employee.repository';

@Module({
  imports: [
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
  controllers: [LoginEmployeeController],
  providers: [LoginEmployeeService, EmployeeRepository],
})
export class LoginEmployeeModule {}
