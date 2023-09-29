import {
  Column,
  CreateDateColumn,
  Entity,
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
  id_employee: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  no_tlp: string;

  @Column()
  gender: string;

  @Column({
    type: 'enum',
    enum: EmployeeRoleType,
    default: EmployeeRoleType.ADMIN,
  })
  role: EmployeeRoleType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
