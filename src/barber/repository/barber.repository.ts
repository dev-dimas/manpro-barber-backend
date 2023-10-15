import { Repository } from 'typeorm';
import { CreateBarberDto, UpdateBarberDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { BarberEntity } from '../entities/barber.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BarberRepository {
  constructor(
    @InjectRepository(BarberEntity)
    private readonly repository: Repository<BarberEntity>,
  ) {}

  async addBarber(barber: CreateBarberDto) {
    return await this.repository.save(barber);
  }

  async getAllBarber() {
    return await this.repository.find();
  }

  async getBarberById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async updateBarberById(id: string, barber: UpdateBarberDto) {
    return await this.repository
      .createQueryBuilder()
      .update(BarberEntity)
      .set(barber)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteBarberById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}
