import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatus } from '../../enum';
import { UserEntity } from '../../user/entities/user.entity';
import { ServiceEntity } from '../../service/entities/service.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  noTlp!: string;

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

  @Column()
  barberman: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.BOOKING,
  })
  status: BookingStatus;

  @ManyToOne(() => UserEntity, (user) => user.booking)
  user!: UserEntity;

  @OneToOne(() => ServiceEntity)
  @JoinColumn()
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
