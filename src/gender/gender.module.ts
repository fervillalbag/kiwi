import { Module } from '@nestjs/common';

import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { Gender, GenderSchema } from './entities/gender.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gender.name, schema: GenderSchema }]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
