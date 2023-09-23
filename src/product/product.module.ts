import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { User } from '../auth/entities/user.entity';
import { StatusProduct } from '../status-product/entities/status-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, StatusProduct])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
