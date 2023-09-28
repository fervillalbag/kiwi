import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Gender } from './entities/gender.entity';
import { CreateGenderDto } from './dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender.name) private readonly genderService: Model<Gender>,
  ) {}

  async create(dto: CreateGenderDto) {
    try {
      const gender = await this.genderService.create(dto);
      return gender;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const genders = await this.genderService.find();
      return genders;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(name: string) {
    try {
      const gender = await this.genderService.findOne({ name });
      return gender;
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const gender = await this.genderService.findOneAndDelete({ id });
      return gender;
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El genero ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }

    console.log(error);
    throw new InternalServerErrorException(
      'No se pudo crear el genero - Revisar la consola',
    );
  }
}
