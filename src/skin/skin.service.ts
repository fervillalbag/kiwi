import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateSkinDto, UpdateSkinDto } from './dto';
import { Skin } from './entities/skin.entity';

@Injectable()
export class SkinService {
  constructor(
    @InjectModel(Skin.name) private readonly skinService: Model<Skin>,
  ) {}

  async create(dto: CreateSkinDto) {
    try {
      const skin = await this.skinService.create(dto);
      return skin;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const skin = await this.skinService.find();
      return skin;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const skin = await this.skinService.findById(id);
      if (!skin) throw new NotFoundException('Skin no encontrada!');

      return skin;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateSkinDto) {
    try {
      const skin = await this.findOne(id);
      if (!skin) throw new NotFoundException('Skin no encontrada!');

      return this.skinService.findByIdAndUpdate(
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
      const skin = await this.findOne(id);
      if (!skin) throw new NotFoundException('Skin no encontrada');

      return this.skinService.findByIdAndDelete(id);
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
