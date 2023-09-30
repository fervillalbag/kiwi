import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryService: Model<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(dto);
      return category;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryService.find();
      return categories;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryService.findById(id);
      if (!category) throw new NotFoundException('Categoria no encontrada');

      return category;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      const category = await this.categoryService.findById(id);
      if (!category) throw new NotFoundException('Categoria no encontrada');

      return this.categoryService.findByIdAndUpdate(
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
      const category = await this.categoryService.findById(id);
      if (!category) throw new NotFoundException('Categoria no encontrada');

      return this.categoryService.findByIdAndDelete(id);
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
