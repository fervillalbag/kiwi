import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeAdDto, UpdateTypeAdDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAd } from './entities/type-ad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeAdService {
  constructor(
    @InjectRepository(TypeAd)
    private readonly typeAdService: Repository<TypeAd>,
  ) {}

  async create(createTypeAdDto: CreateTypeAdDto) {
    const typeAd = this.typeAdService.create({
      ...createTypeAdDto,
    });
    await this.typeAdService.save(typeAd);
    return typeAd;
  }

  findAll() {
    return this.typeAdService.find();
  }

  findOne(id: string) {
    return this.typeAdService.findOneBy({ id });
  }

  async update(id: string, updateTypeAdDto: UpdateTypeAdDto) {
    const typeAd = await this.findOne(id);

    if (!typeAd)
      throw new NotFoundException('Tipo de publicidad no encontrada');

    Object.assign(typeAd, updateTypeAdDto);
    return await this.typeAdService.save(typeAd);
  }

  async remove(id: string) {
    const typeAd = await this.findOne(id);

    if (!typeAd)
      throw new NotFoundException('Tipo de publicidad no encontrada');

    return await this.typeAdService.remove(typeAd);
  }
}
