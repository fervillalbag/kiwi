import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { User } from '../auth/entities/user.entity';
import { StatusProduct } from '../status-product/entities/status-product.entity';
import { SaleStatus } from '../sale-status/entities/sale-status.entity';
import { TypeProduct } from '../type-product/entities/type-product.entity';
import { Currency } from '../currency/entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      StatusProduct,
      TypeProduct,
      Currency,
      SaleStatus,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
