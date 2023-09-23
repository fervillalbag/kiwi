import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusProductService } from './status-product.service';
import { StatusProductController } from './status-product.controller';
import { Product } from '../product/entities/product.entity';
import { StatusProduct } from './entities/status-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, StatusProduct])],
  controllers: [StatusProductController],
  providers: [StatusProductService],
})
export class StatusProductModule {}
