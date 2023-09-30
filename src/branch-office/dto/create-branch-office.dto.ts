import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBranchOfficeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  business: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  contact_info: string;

  @IsString()
  @IsNotEmpty()
  schedule: string;
}
