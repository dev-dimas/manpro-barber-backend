import { ServiceEntity } from '../../service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EmployeeRoleType {
  OWNER = 'owner',
  ADMIN = 'admin',
}

export enum GenderType {
  L = 'l',
  P = 'p',
}

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  no_tlp: string;

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

  @OneToMany(() => ServiceEntity, (service) => service.employee)
  services: ServiceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
