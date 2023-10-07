import { BarberEntity } from '../../barber/entities/barber.entity';
import { GenderType, EmployeeRoleType } from '../../enum';
import { ServiceEntity } from '../../service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  noTlp: string;

  @Column({
    type: 'enum',
    enum: GenderType,
    default: GenderType.L,
  })
  gender: GenderType;

  @Column({
    type: 'enum',
    enum: EmployeeRoleType,
    default: EmployeeRoleType.ADMIN,
  })
  role: EmployeeRoleType;

  @ManyToOne(() => BarberEntity, (barber) => barber.employee)
  barber: BarberEntity;

  @OneToMany(() => ServiceEntity, (service) => service.employee)
  services: ServiceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
