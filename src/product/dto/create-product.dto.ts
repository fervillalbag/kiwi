import { IsString, IsArray, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  measureType: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  statusProduct: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subCategory: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  saleStatus: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  tags: string[];

  @IsArray()
  images: string[];
}
