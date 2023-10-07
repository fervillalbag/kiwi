import {
  IsBoolean,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsArray()
  branch_offices?: string[];

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsOptional()
  skin?: string;

  @IsBoolean()
  @IsOptional()
  affiliated: boolean;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topics?: string[];
}
