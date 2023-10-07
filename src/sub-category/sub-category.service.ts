import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryService: Model<SubCategory>,
  ) {}

  async create(dto: CreateSubCategoryDto) {
    try {
      const subCategory = await this.subCategoryService.create(dto);
      return subCategory;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const subCategories = await this.subCategoryService.find();
      return subCategories;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAllByCategory(id: string) {
    try {
      const subCategories = await this.subCategoryService.find({
        category: id,
      });
      return subCategories;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const subCategory = await this.subCategoryService.findById(id);
      return subCategory;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    try {
      const subCategory = await this.findOne(id);
      if (!subCategory)
        throw new NotFoundException('Sub categoria no encontrada');

      return this.subCategoryService.findByIdAndUpdate(
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
      const subCategory = await this.findOne(id);
      if (!subCategory)
        throw new NotFoundException('Sub categoria no encontrada');

      return this.subCategoryService.findByIdAndDelete(id);
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
