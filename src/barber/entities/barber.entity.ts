import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
