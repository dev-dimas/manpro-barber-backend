import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/user/login.module';
import { EmployeeModule } from './employee/employee.module';
import { LoginEmployeeModule } from './login/employee/login.employee.module';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    }),
    LoginModule,
    UserModule,
    EmployeeModule,
    LoginEmployeeModule,
    ServiceModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class AppModule {}
