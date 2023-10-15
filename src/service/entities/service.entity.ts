import { DetailBookingEntity } from '../../booking/entities';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column({ type: 'time' })
  duration: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.services)
  employee: EmployeeEntity;

  @OneToMany(
    () => DetailBookingEntity,
    (detailBooking) => detailBooking.service,
  )
  detailBooking: DetailBookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
