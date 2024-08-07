import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarController } from './avatar/avatar.controller';
import { BarberModule } from './barber/barber.module';
import { BookingModule } from './booking/booking.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { LoginModule } from './login/login.module';
import { PasswordModule } from './password/password.module';
import { PaymentModule } from './payment/payment.module';
import { SeederModule } from './seeder/seeder.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
    Reflector,
  ],
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
    ServiceModule,
    BarberModule,
    SeederModule,
    BookingModule,
    PasswordModule,
    PaymentModule,
  ],
  controllers: [AvatarController],
})
export class AppModule {}
