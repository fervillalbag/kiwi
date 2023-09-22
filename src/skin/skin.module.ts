import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SkinService } from './skin.service';
import { SkinController } from './skin.controller';
import { Skin } from './entities/skin.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  controllers: [SkinController],
  imports: [TypeOrmModule.forFeature([Skin, User])],
  providers: [SkinService],
})
export class SkinModule {}
