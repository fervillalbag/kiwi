import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryService: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryService.create({ ...createCategoryDto });
    await this.categoryService.save(category);
    return category;
  }

  findAll() {
    return this.categoryService.find();
  }

  findOne(id: string) {
    return this.categoryService.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) throw new NotFoundException('Categoria no encontrada');
    Object.assign(category, updateCategoryDto);

    return await this.categoryService.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Categoria no encontrada');

    return await this.categoryService.remove(category);
  }
}
