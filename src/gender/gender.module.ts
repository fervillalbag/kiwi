import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { Gender } from './entities/gender.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  controllers: [GenderController],
  imports: [TypeOrmModule.forFeature([Gender, User])],
  providers: [GenderService],
})
export class GenderModule {}
