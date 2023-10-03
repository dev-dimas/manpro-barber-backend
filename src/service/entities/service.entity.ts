import { BarberEntity } from '../../barber/entities/baeber.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
