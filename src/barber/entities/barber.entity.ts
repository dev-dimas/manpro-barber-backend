import { EmployeeEntity } from '../../employee/entities/employee.entity';
import { ServiceEntity } from '../../service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('barbershop')
export class BarberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  barber: number;

  @Column()
  noTlp: string;

  @Column()
  address: string;

  @Column({
    type: 'time',
  })
  open: string;

  @Column({
    type: 'time',
  })
  closed: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.barber)
  employee: EmployeeEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.barber)
  services: ServiceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
