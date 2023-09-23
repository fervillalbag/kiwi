import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('subcategories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('bool', { default: true })
  isActive: boolean;

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
