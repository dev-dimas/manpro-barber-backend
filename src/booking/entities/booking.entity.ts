import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from '../../enum';
import { UserEntity } from '../../user/entities/user.entity';
import { DetailBookingEntity } from './detail.booking.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  noTlp: string;

  @Column()
  date: Date;

  @Column({
    type: 'time',
  })
  startTime: string;

  @Column({
    type: 'time',
  })
  endTime: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.BOOKING,
  })
  status: BookingStatus;

  @ManyToOne(() => UserEntity, (user) => user.booking)
  user!: UserEntity;

  @OneToMany(
    () => DetailBookingEntity,
    (detailBooking) => detailBooking.booking,
  )
  detailBooking: DetailBookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
