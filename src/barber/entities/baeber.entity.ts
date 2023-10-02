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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barber: number;

  @Column()
  no_tlp: string;

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

  @OneToMany(() => ServiceEntity, (service) => service.barber)
  services: ServiceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
