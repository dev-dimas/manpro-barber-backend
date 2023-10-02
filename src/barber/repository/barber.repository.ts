import { DataSource, Repository } from 'typeorm';
import { CreateBarberDto, UpdateBarberDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { BarberEntity } from '../entities/baeber.entity';

@Injectable()
export class BarberRepository extends Repository<BarberEntity> {
  constructor(private dataSource: DataSource) {
    super(BarberEntity, dataSource.createEntityManager());
  }

  async addBarber(barber: CreateBarberDto) {
    return await this.save(barber);
  }

  async getAllBarber() {
    return await this.find();
  }

  async getBarberById(id: number) {
    return await this.findOneBy({
      id,
    });
  }

  async updateBarberById(id: number, barber: UpdateBarberDto) {
    return await this.createQueryBuilder()
      .update(BarberEntity)
      .set(barber)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteBarberById(id: number) {
    return await this.delete({
      id,
    });
  }
}
