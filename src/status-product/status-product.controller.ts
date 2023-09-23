import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusProductService } from './status-product.service';
import { CreateStatusProductDto, UpdateStatusProductDto } from './dto';

@Controller('status-product')
export class StatusProductController {
  constructor(private readonly statusProductService: StatusProductService) {}

  @Post()
  create(@Body() createStatusProductDto: CreateStatusProductDto) {
    return this.statusProductService.create(createStatusProductDto);
  }

  @Get()
  findAll() {
    return this.statusProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusProductService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusProductDto: UpdateStatusProductDto,
  ) {
    return this.statusProductService.update(id, updateStatusProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusProductService.remove(id);
  }
}
