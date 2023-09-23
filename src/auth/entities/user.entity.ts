import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Skin } from '../../skin/entities/skin.entity';
import { Gender } from '../../gender/entities/gender.entity';

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

  @Column('bool', { default: true })
  isActive: string;

  @Column('text', { nullable: true })
  banner?: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @Column('bool', { default: false })
  verified?: boolean;

  @OneToOne(() => Gender, (gender) => gender.user, { eager: true })
  @JoinColumn()
  gender: string;

  @OneToOne(() => Skin, (skin) => skin.user, { eager: true })
  @JoinColumn()
  skin: string;

  @Column('bool', { default: false })
  affiliated: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('text', { array: true, default: [] })
  topics: string[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
