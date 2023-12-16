import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { DateDto, EmployeeCreateBookingDto, UserCreateBookingDto } from './dto';
import { UserRepository } from '../user/repository/user.repository';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

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

  async getBookingByIdAndUserId(id: string, req: any) {
    const booking = await this.bookingRepository.getBookingById(id);
    if (!booking)
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);

    const res = await this.bookingRepository.getBookingByIdAndUserId(
      id,
      req.user.sub.id,
    );
    return { statusCode: HttpStatus.OK, data: res };
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

  async getDataForDashboarddUser(req: any) {
    const userId = req.user.sub.id;
    const date = dayjs().format('YYYY-MM-DD');
    let queue: number | null = null;
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
      queue = foundIndex + 1;
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
        queue,
        serviceName,
      },
    };
  }

  async getRecapByYear(dateDto: DateDto) {
    const lengthReurnData = 5;
    const year = dayjs(dateDto.date).format('YYYY');
    const endDate = dayjs(`${year}-12-31`).format('YYYY-MM-DD');
    const startDate = dayjs(`${year}-12-31`)
      .subtract(4, 'year')
      .format('YYYY-MM-DD');
    const data = [];

    for (let i = lengthReurnData - 1; i >= 0; i--) {
      const date = dayjs(dateDto.date).subtract(i, 'year').format('YYYY-MM-DD');
      data.push({ date, total: 0 });
    }

    const res = await this.bookingRepository.getRecapYearly(startDate, endDate);

    data.forEach((element) => {
      const year = dayjs(element.date).format('YYYY');
      const matchDate = res.find((element2) => year === element2.year);

      if (matchDate) {
        element.total = matchDate.total;
      }
    });

    return data;
  }

  async getRecapByMonth(dateDto: DateDto) {
    const lengthReurnData = 12;
    const day = dayjs(dateDto.date).format('DD');
    const year = dayjs(dateDto.date).format('YYYY');
    const startDate = dayjs(`${year}-01-${day}`).format('YYYY-MM-DD');
    const endDate = dayjs(`${year}-12-31`).format('YYYY-MM-DD');
    const data = [];

    for (let i = 0; i < lengthReurnData; i++) {
      const date = dayjs(startDate).add(i, 'month').format('YYYY-MM-DD');
      data.push({ date, total: 0 });
    }

    const res = await this.bookingRepository.getRecapMonthly(
      startDate,
      endDate,
    );

    data.forEach((element) => {
      const month = dayjs(element.date).format('MM');
      const matchDate = res.find((element2) => month === element2.month);

      if (matchDate) {
        element.total = matchDate.total;
      }
    });

    return data;
  }

  async getRecapByWeek(dateDto: DateDto) {
    dayjs.extend(weekOfYear);
    const lengthReurnData = 4;
    const data = [];

    for (let i = lengthReurnData - 1; i >= 0; i--) {
      const date = dayjs(dateDto.date).subtract(i, 'week').format('YYYY-MM-DD');
      data.push({ date, total: 0 });
    }

    const res = await this.bookingRepository.getRecapWeekly(
      data[0].date,
      dateDto.date,
    );

    data.forEach((element) => {
      const week = dayjs(element.date).week();
      const matchDate = res.find((element2) => `${week}` === element2.week);

      if (matchDate) {
        element.total = matchDate.total;
      }
    });

    return data;
  }

  async getRecapByDay(dateDto: DateDto) {
    const lengthReurnData = 8;
    const data = [];

    for (let i = lengthReurnData - 1; i >= 0; i--) {
      const date = dayjs(dateDto.date).subtract(i, 'day').format('YYYY-MM-DD');
      data.push({ date, total: 0 });
    }

    const res = await this.bookingRepository.getRecapDayly(
      data[0].date,
      dateDto.date,
    );

    res.forEach((element: { date: string }) => {
      element.date = dayjs(element.date).format('YYYY-MM-DD');
    });

    data.forEach((element) => {
      const matchDate = res.find((element2) => element.date === element2.date);

      if (matchDate) {
        element.total = matchDate.total;
      }
    });

    return data;
  }

  async getRecap(dateDto: DateDto) {
    const daily = await this.getRecapByDay(dateDto);
    const weekly = await this.getRecapByWeek(dateDto);
    const monthly = await this.getRecapByMonth(dateDto);
    const yearly = await this.getRecapByYear(dateDto);
    return {
      statusCode: HttpStatus.OK,
      data: { daily, weekly, monthly, yearly },
    };
  }
}
