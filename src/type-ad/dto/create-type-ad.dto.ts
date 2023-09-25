import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeAdDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
