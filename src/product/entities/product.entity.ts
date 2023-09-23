import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  measureType: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: string;

  @Column('float')
  price: number;
}
