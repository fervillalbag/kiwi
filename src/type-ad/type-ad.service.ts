import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTypeAdDto, UpdateTypeAdDto } from './dto';
import { TypeAd } from './entities/type-ad.entity';

@Injectable()
export class TypeAdService {
  constructor(
    @InjectModel(TypeAd.name) private readonly typeAdService: Model<TypeAd>,
  ) {}

  async create(dto: CreateTypeAdDto) {
    try {
      const typeAd = await this.typeAdService.create(dto);
      return typeAd;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const typeAd = await this.typeAdService.find();
      return typeAd;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(param: string, value: string) {
    try {
      const typeAd = await this.typeAdService.findOne({ [param]: value });
      if (!typeAd)
        throw new NotFoundException('Tipo de publicidad no encontrada');

      return typeAd;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateTypeAdDto) {
    try {
      const typeAd = await this.typeAdService.findById(id);
      if (!typeAd)
        throw new NotFoundException('Tipo de publicidad no encontrada');

      return this.typeAdService.findByIdAndUpdate(
        id,
        {
          ...dto,
          updatedAt: new Date(),
        },
        { new: true },
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const typeAd = await this.typeAdService.findById(id);
      if (!typeAd)
        throw new NotFoundException('Tipo de publicidad no encontrada');

      return this.typeAdService.findByIdAndDelete(id);
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
    throw new BadRequestException(error);
  }
}
