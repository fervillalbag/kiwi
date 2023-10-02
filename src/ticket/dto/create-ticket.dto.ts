import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @IsString()
  @IsNotEmpty()
  buyer: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  product: string;
}
