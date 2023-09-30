import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BranchOfficeService } from './branch-office.service';
import { BranchOfficeController } from './branch-office.controller';
import {
  BranchOffice,
  BranchOfficeSchema,
} from './entities/branch-office.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BranchOffice.name, schema: BranchOfficeSchema },
    ]),
  ],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService],
})
export class BranchOfficeModule {}
