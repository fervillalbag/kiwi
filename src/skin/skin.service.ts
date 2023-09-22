import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSkinDto, UpdateSkinDto } from './dto';
import { Skin } from './entities/skin.entity';

@Injectable()
export class SkinService {
  constructor(
    @InjectRepository(Skin) private readonly skinService: Repository<Skin>,
  ) {}

  async create(createSkinDto: CreateSkinDto) {
    const skin = this.skinService.create({
      ...createSkinDto,
    });

    await this.skinService.save(skin);
    return skin;
  }

  findAll() {
    return this.skinService.find();
  }

  findOne(id: string) {
    return this.skinService.findOneBy({ id });
  }

  async update(id: string, updateSkinDto: UpdateSkinDto) {
    const skin = await this.findOne(id);
    if (!skin) {
      throw new NotFoundException('Skin no encontrada');
    }

    Object.assign(skin, updateSkinDto);
    return await this.skinService.save(skin);
  }

  async remove(id: string) {
    const skin = await this.findOne(id);
    if (!skin) {
      throw new NotFoundException('Skin no encontrada');
    }

    return this.skinService.remove(skin);
  }
}
