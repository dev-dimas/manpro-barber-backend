import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeCreateBookingDto, UserCreateBookingDto } from './dto';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async bookingIsFull(service: any, date: string, startTime: string) {
    const employeeInCharge =
      await this.employeeRepository.countEmployeeInCharge();

    let endTime = dayjs(`${date} ${startTime}`);

    const duration = dayjs(`${date} ${service.duration}`);

    endTime = endTime
      .add(Number(duration.format('H')), 'h')
      .add(Number(duration.format('m')), 'm');

    const numberOfBooking =
      await this.bookingRepository.countBookingByRangeStartEndTime(
        startTime,
        endTime.format('HH:mm'),
        dayjs(date).toDate(),
      );

    if (numberOfBooking >= employeeInCharge) return { status: true };

    const barberman = 1 + numberOfBooking;
    return { status: false, barberman, endTime: endTime.format('HH:mm') };
  }

  async userAddBooking(userCreateBookingDto: UserCreateBookingDto) {
    const user = await this.userRepository.getUserById(
      userCreateBookingDto.userId,
    );
    if (!user) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);

    const service = await this.serviceRepository.getServiceById(
      userCreateBookingDto.serviceId,
    );
    if (!service)
      throw new HttpException(`Service not found`, HttpStatus.NOT_FOUND);

    const id = Date.now().toString();

    const newBooking = await this.bookingRepository.userAddBooking(
      userCreateBookingDto,
      id,
    );

    return { statusCode: HttpStatus.CREATED, data: newBooking.raw[0] };
  }

  async employeeAddBooking(employeeCreateBookingDto: EmployeeCreateBookingDto) {
    const employee = await this.employeeRepository.getEmployeeById(
      employeeCreateBookingDto.employeeId,
    );
    if (!employee)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);

    const service = await this.serviceRepository.getServiceById(
      employeeCreateBookingDto.serviceId,
    );
    if (!service)
      throw new HttpException(`Service not found`, HttpStatus.NOT_FOUND);

    const id = Date.now().toString();

    const bookingIsFull = await this.bookingIsFull(
      service,
      employeeCreateBookingDto.date,
      employeeCreateBookingDto.startTime,
    );

    if (bookingIsFull.status)
      return { statusCode: HttpStatus.CONFLICT, message: 'full' };

    const newBooking = await this.bookingRepository.employeeAddBooking(
      employeeCreateBookingDto,
      bookingIsFull.endTime,
      bookingIsFull.barberman,
      id,
    );

    return { statusCode: HttpStatus.CREATED, data: newBooking.raw[0] };
  }
}
