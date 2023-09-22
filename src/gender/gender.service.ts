import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Gender } from './entities/gender.entity';
import { CreateGenderDto } from './dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderService: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto) {
    const gender = this.genderService.create({
      ...createGenderDto,
    });

    await this.genderService.save(gender);
    return gender;
  }

  findAll() {
    return this.genderService.find();
  }

  findOne(name: string) {
    return this.genderService.findOneBy({ name });
  }

  async remove(name: string) {
    const gender = await this.findOne(name);
    return this.genderService.remove(gender);
  }
}
