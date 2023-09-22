import {
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

  @IsString()
  @IsNotEmpty()
  gender: string;

  skin: { id: string };

  @IsString()
  @IsOptional()
  banner?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @IsArray()
  @IsString({ each: true })
  topics: string[];
}
