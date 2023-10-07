import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberRepository } from './repository/barber.repository';
import { CreateBarberDto, UpdateBarberDto } from './dto';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(BarberRepository)
    private readonly barberRepository: BarberRepository,
  ) {}

  async createBarber(createBarberDto: CreateBarberDto) {
    const barber = await this.barberRepository.addBarber(createBarberDto);
    return { statusCode: HttpStatus.CREATED, data: barber };
  }

  async getAllBarber() {
    const barber = await this.barberRepository.getAllBarber();
    return { statusCode: HttpStatus.OK, data: barber };
  }

  async updateBarber(id: string, updateBarberDto: UpdateBarberDto) {
    const barber = await this.barberRepository.updateBarberById(
      id,
      updateBarberDto,
    );

    if (barber.affected == 0)
      throw new HttpException(`Id barber not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: barber.raw[0] };
  }

  async getBarber(id: string) {
    const barber = await this.barberRepository.getBarberById(id);

    if (!barber)
      throw new HttpException(`Id barber not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: barber };
  }

  async deleteBarber(id: string) {
    const barber = await this.barberRepository.deleteBarberById(id);

    if (barber.affected == 0)
      throw new HttpException(`Id barber not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: barber.raw[0] };
  }
}
