import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Public } from '../decorator';
import { CreateBookingDto } from './dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Public()
  @Post('booking')
  postBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.addBooking(createBookingDto);
  }
}
