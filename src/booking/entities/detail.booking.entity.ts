import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { ServiceEntity } from '../../service/entities/service.entity';

@Entity('detailbooking')
export class DetailBookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.detailBooking)
  booking: BookingEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.detailBooking)
  service: BookingEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
