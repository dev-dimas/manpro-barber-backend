import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Roles } from '../decorator';
import { Role } from '../enum';
import { EmployeeCreateBookingDto, UserCreateBookingDto } from './dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(Role.USER)
  @Post('userbooking')
  postUserBooking(@Body() userCreateBookingDto: UserCreateBookingDto) {
    return this.bookingService.userAddBooking(userCreateBookingDto);
  }

  @Roles(Role.BARBERMAN)
  @Post('employeebooking')
  postEmployeeBooking(
    @Body() employeeCreateBookingDto: EmployeeCreateBookingDto,
  ) {
    return this.bookingService.employeeAddBooking(employeeCreateBookingDto);
  }
}
