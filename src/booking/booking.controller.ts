import { Body, Controller, Post, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Public } from '../decorator';
import { CreateBookingDto } from './dto';
import { Request } from 'express';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Public()
  @Post('booking')
  postBooking(@Body() createBookingDto: CreateBookingDto, @Req() req: Request) {
    return this.bookingService.addBooking(createBookingDto, req.user);
  }
}
