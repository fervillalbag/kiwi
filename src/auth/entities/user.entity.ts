import { Gender } from '../../gender/entities/gender.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  fullname: string;

  @Column('text')
  password: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { nullable: true })
  banner?: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @OneToOne(() => Gender, (gender) => gender.user, { eager: true })
  @JoinColumn()
  gender: string;

  // @Column('text', { unique: true })
  // skin: string;

  @Column('bool', { default: false })
  affiliated: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('text', { array: true, default: [] })
  topics: string[];

  @Column('date', { default: new Date().toISOString() })
  createdAt: Date;

  @Column('date', { default: new Date().toISOString() })
  updatedAt: Date;
}
