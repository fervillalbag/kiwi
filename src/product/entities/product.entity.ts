import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { StatusProduct } from '../../status-product/entities/status-product.entity';
import { Currency } from '../../currency/entities/currency.entity';
import { TypeProduct } from '../../type-product/entities/type-product.entity';

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

  @OneToOne(() => Currency, (currency) => currency.id)
  @JoinColumn()
  currency: string;

  @OneToOne(() => TypeProduct, (typeProduct) => typeProduct.id)
  @JoinColumn()
  type: string;

  @Column('text')
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: string;

  @Column('float')
  price: number;
}
