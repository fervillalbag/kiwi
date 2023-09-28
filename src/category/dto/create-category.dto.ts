import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  subCategory?: SubCategory;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
