import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { DateDto, EmployeeCreateBookingDto, UserCreateBookingDto } from './dto';
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

    const employee = await this.employeeRepository.getAllEmployee();
    const barberman = employee[numberOfBooking].name;
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

  async updateBookingStatus(id: string, req: any) {
    const booking = await this.bookingRepository.getBookingById(id);
    if (!booking)
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);

    const res = await this.bookingRepository.updateBookingStatus(
      id,
      req.user.sub.id,
    );
    return { statusCode: HttpStatus.OK, data: res.raw[0] };
  }

  async getBookingForChart(dateDto: DateDto) {
    const bookings =
      await this.bookingRepository.getAllBookingByStatusBookingAndDate(
        dateDto.date,
      );

    const res = bookings.map((booking) => {
      return {
        barber: booking.barberman,
        start: dayjs(`${booking.date} ${booking.startTime}`),
        end: dayjs(`${booking.date} ${booking.endTime}`),
      };
    });

    return { statusCode: HttpStatus.OK, data: res };
  }

  async getBookingForConfirmBooking() {
    const date = dayjs().format('YYYY-MM-DD');
    const booking =
      await this.bookingRepository.getAllBookingByStatusBookingAndDate(date);

    return { statusCode: HttpStatus.OK, data: booking };
  }

  async getTransactionHistory(req: any) {
    const userId = req.user.sub.id;

    const booking = await this.bookingRepository.getAllBookingByUserId(userId);

    return { statusCode: HttpStatus.OK, data: booking };
  }

  async getDataForDashboardUser(req: any) {
    const userId = req.user.sub.id;
    const date = dayjs().format('YYYY-MM-DD');
    let queque: number | null = null;
    let serviceName: string | null = null;

    const transactionSucces =
      await this.bookingRepository.countAllBookingSuccesByUserId(userId);

    const lastTimeHaircut = await this.bookingRepository.getLastTimeHaircut(
      userId,
    );

    const bookings = await this.bookingRepository.getAllBookingByDate(date);

    let foundIndex = -1;

    bookings.forEach((booking, index) => {
      if (booking.userId === userId) {
        foundIndex = index;
      }
    });

    if (foundIndex !== -1) {
      queque = foundIndex + 1;
    }

    if (bookings[foundIndex]) {
      const service = await this.serviceRepository.getServiceById(
        bookings[foundIndex].serviceId,
      );
      serviceName = service.name;
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        booking: bookings[foundIndex],
        transactionSucces,
        lastTimeHaircut,
        queque,
        serviceName,
      },
    };
  }
}
