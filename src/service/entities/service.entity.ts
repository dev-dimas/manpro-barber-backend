import { BookingEntity } from '../../booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({
    default: null,
  })
  information: string | null;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  booking: BookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
