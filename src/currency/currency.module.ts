import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { Currency, CurrencySchema } from './entities/currency.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
