import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SaleStatusService } from './sale-status.service';
import { SaleStatusController } from './sale-status.controller';
import { SaleStatus, SaleStatusSchema } from './entities/sale-status.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaleStatus.name, schema: SaleStatusSchema },
    ]),
  ],
  controllers: [SaleStatusController],
  providers: [SaleStatusService],
})
export class SaleStatusModule {}
