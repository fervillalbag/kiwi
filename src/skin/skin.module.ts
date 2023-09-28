import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SkinService } from './skin.service';
import { SkinController } from './skin.controller';
import { Skin, SkinSchema } from './entities/skin.entity';

@Module({
  controllers: [SkinController],
  imports: [
    MongooseModule.forFeature([{ name: Skin.name, schema: SkinSchema }]),
  ],
  providers: [SkinService],
})
export class SkinModule {}
