import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeAdService } from './type-ad.service';
import { TypeAdController } from './type-ad.controller';
import { Product } from '../product/entities/product.entity';
import { TypeAd } from './entities/type-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, TypeAd])],
  controllers: [TypeAdController],
  providers: [TypeAdService],
})
export class TypeAdModule {}
