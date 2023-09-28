import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TypeProductService } from './type-product.service';
import { TypeProductController } from './type-product.controller';
import { TypeProduct, TypeProductSchema } from './entities/type-product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TypeProduct.name, schema: TypeProductSchema },
    ]),
  ],
  controllers: [TypeProductController],
  providers: [TypeProductService],
})
export class TypeProductModule {}
