import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { BookingService } from '../booking/booking.service';
import { UserRepository } from '../user/repository/user.repository';
import { ServiceRepository } from '../service/repository/service.repository';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userRepository: UserRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async addPayment(paymentDto: PaymentDto) {
    const user = await this.userRepository.getUserById(paymentDto.userId);
    if (!user) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);

    const service = await this.serviceRepository.getServiceById(
      paymentDto.serviceId,
    );
    if (!service)
      throw new HttpException(`Service not found`, HttpStatus.NOT_FOUND);

    const bookingIsFull = await this.bookingService.bookingIsFull(
      service,
      paymentDto.date,
      paymentDto.startTime,
    );

    if (bookingIsFull.status)
      return { statusCode: HttpStatus.CONFLICT, message: 'full' };

    const id = `order-${Date.now().toString()}`;

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: service.price,
      },
      credit_card: {
        secure: true,
      },
      item_details: [
        {
          id: paymentDto.serviceId,
          price: service.price,
          quantity: 1,
          name: service.name,
        },
      ],
      customer_details: {
        first_name: paymentDto.name,
        phone: paymentDto.phone,
      },
      page_expiry: {
        duration: 30,
        unit: 'minute',
      },
    };

    const snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.SERVER_KEY_TEST,
    });

    const payment = await snap.createTransaction(parameter);

    return {
      statusCode: HttpStatus.OK,
      data: {
        payment,
        booking_details: {
          userId: paymentDto.userId,
          serviceId: service.id,
          name: paymentDto.name,
          phone: paymentDto.phone,
          date: paymentDto.date,
          startTime: paymentDto.startTime,
          endTime: bookingIsFull.endTime,
          barberman: bookingIsFull.barberman,
        },
      },
    };
  }
}
