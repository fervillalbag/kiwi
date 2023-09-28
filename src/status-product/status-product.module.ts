import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatusProductService } from './status-product.service';
import { StatusProductController } from './status-product.controller';
import {
  StatusProduct,
  StatusProductSchema,
} from './entities/status-product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatusProduct.name, schema: StatusProductSchema },
    ]),
  ],
  controllers: [StatusProductController],
  providers: [StatusProductService],
})
export class StatusProductModule {}
