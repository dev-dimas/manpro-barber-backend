import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Roles } from '../decorator';
import { Role } from '../enum';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentservice: PaymentService) {}

  @Roles(Role.USER)
  @Post()
  payment(@Body() paymentDto: PaymentDto) {
    return this.paymentservice.addPayment(paymentDto);
  }
}
