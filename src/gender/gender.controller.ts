import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.genderService.findOne(name);
  }

  @Delete(':name')
  remove(@Param('id') id: string) {
    return this.genderService.remove(id);
  }
}
