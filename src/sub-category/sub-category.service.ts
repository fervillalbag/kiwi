import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryService: Repository<SubCategory>,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = this.subCategoryService.create({
      ...createSubCategoryDto,
    });

    await this.subCategoryService.save(subCategory);
    return subCategory;
  }

  findAll() {
    return this.subCategoryService.find();
  }

  findOne(id: string) {
    return this.subCategoryService.findOneBy({ id });
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.findOne(id);

    if (!subCategory)
      throw new NotFoundException('Sub categoria no encontrada');

    Object.assign(subCategory, updateSubCategoryDto);
    return await this.subCategoryService.save(subCategory);
  }

  async remove(id: string) {
    const subCategory = await this.findOne(id);

    if (!subCategory)
      throw new NotFoundException('Sub categoria no encontrada');

    return await this.subCategoryService.remove(subCategory);
  }
}
