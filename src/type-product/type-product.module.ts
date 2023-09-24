import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeProductService } from './type-product.service';
import { TypeProductController } from './type-product.controller';
import { Product } from '../product/entities/product.entity';
import { TypeProduct } from './entities/type-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, TypeProduct])],
  controllers: [TypeProductController],
  providers: [TypeProductService],
})
export class TypeProductModule {}
