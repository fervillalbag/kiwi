import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('user')
  findOne(@Query() query: string) {
    const key = Object.keys(query)[0];
    const value = Object.values(query)[0];

    return this.authService.findOne(key, value);
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
