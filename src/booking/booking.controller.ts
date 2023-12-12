import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';
import { DateDto, EmployeeCreateBookingDto, UserCreateBookingDto } from './dto';
import { Request } from 'express';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(Role.USER)
  @Post('user-booking')
  postUserBooking(@Body() userCreateBookingDto: UserCreateBookingDto) {
    return this.bookingService.userAddBooking(userCreateBookingDto);
  }

  @Roles(Role.BARBERMAN)
  @Post('employee-booking')
  postEmployeeBooking(
    @Body() employeeCreateBookingDto: EmployeeCreateBookingDto,
  ) {
    return this.bookingService.employeeAddBooking(employeeCreateBookingDto);
  }

  @Roles(Role.BARBERMAN)
  @Patch('booking/:id')
  updateBookingStatus(@Param('id') id: string, @Req() req: Request) {
    return this.bookingService.updateBookingStatus(id, req);
  }

  @Public()
  @Get('booking-chart')
  getBookingForChart(@Body() dateDto: DateDto) {
    return this.bookingService.getBookingForChart(dateDto);
  }

  @Roles(Role.BARBERMAN)
  @Get('confirm-booking')
  getBookingForConfirmBooking() {
    return this.bookingService.getBookingForConfirmBooking();
  }

  @Roles(Role.USER)
  @Get('transaction-history')
  getTransactionHistory(@Req() req: Request) {
    return this.bookingService.getTransactionHistory(req);
  }

  @Roles(Role.USER)
  @Get('dashboard-user')
  getdashboarduser(@Req() req: Request) {
    return this.bookingService.getDataForDashboarddUser(req);
  }
}
