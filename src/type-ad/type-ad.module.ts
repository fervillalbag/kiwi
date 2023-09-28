import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TypeAdService } from './type-ad.service';
import { TypeAdController } from './type-ad.controller';
import { TypeAd, TypeAdSchema } from './entities/type-ad.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TypeAd.name, schema: TypeAdSchema }]),
  ],
  controllers: [TypeAdController],
  providers: [TypeAdService],
})
export class TypeAdModule {}
