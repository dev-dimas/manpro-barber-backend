import { BarberEntity } from '../../barber/entities/barber.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service')
@Unique(['name', 'barber'])
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'time' })
  duration: string;

  @ManyToOne(() => BarberEntity, (barber) => barber.services)
  barber: BarberEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.services)
  employee: EmployeeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
