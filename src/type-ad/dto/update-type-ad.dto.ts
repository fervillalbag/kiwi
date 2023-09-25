import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAdDto } from './create-type-ad.dto';

export class UpdateTypeAdDto extends PartialType(CreateTypeAdDto) {}
