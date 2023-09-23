import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { StatusProduct } from 'src/status-product/entities/status-product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  measureType: string;

  @Column('text')
  title: string;

  @OneToOne(() => StatusProduct, (statusProduct) => statusProduct.id)
  @JoinColumn()
  statusProduct: string;

  @Column('text')
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: string;

  @Column('float')
  price: number;
}
