import { GenderType } from '../../enum';
import { BookingEntity } from '../../booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: 0 })
  point: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: null })
  avatar: string | null;

  @Column({ default: null })
  pathAvatar: string | null;

  @Column({
    type: 'enum',
    enum: GenderType,
    default: null,
  })
  gender: GenderType | null;

  @Column({ type: 'date', default: null })
  birthdayDate: string | null;

  @Column({ type: 'text', default: null })
  address: string | null;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  booking: BookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
