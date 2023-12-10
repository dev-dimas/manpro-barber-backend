import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from '../../enum';
import { UserEntity } from '../../user/entities/user.entity';
import { ServiceEntity } from '../../service/entities/service.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: null })
  name: string | null;

  @Column({ default: null })
  phone: string | null;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'time',
  })
  startTime: string;

  @Column({
    type: 'time',
  })
  endTime: string;

  @Column()
  barberman: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.BOOKING,
  })
  status: BookingStatus;

  @ManyToOne(() => UserEntity, (user) => user.booking, { nullable: true })
  user: UserEntity | null;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.booking, {
    nullable: true,
  })
  employee: EmployeeEntity | null;

  @ManyToOne(() => ServiceEntity, (service) => service.booking)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
