import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
