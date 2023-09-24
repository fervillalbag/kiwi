import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SaleStatusService } from './sale-status.service';
import { SaleStatusController } from './sale-status.controller';
import { Product } from '../product/entities/product.entity';
import { SaleStatus } from './entities/sale-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SaleStatus])],
  controllers: [SaleStatusController],
  providers: [SaleStatusService],
})
export class SaleStatusModule {}
