import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeAdService } from './type-ad.service';
import { CreateTypeAdDto, UpdateTypeAdDto } from './dto';

@Controller('type-ad')
export class TypeAdController {
  constructor(private readonly typeAdService: TypeAdService) {}

  @Post()
  create(@Body() createTypeAdDto: CreateTypeAdDto) {
    return this.typeAdService.create(createTypeAdDto);
  }

  @Get()
  findAll() {
    return this.typeAdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeAdService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeAdDto: UpdateTypeAdDto) {
    return this.typeAdService.update(id, updateTypeAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeAdService.remove(id);
  }
}
