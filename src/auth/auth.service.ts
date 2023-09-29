import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateAuthDto, UpdateAuthDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userService: Model<User>,
  ) {}

  async create(dto: CreateAuthDto) {
    try {
      const user = await this.userService.create(dto);
      return user;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userService.find();
      return users;
    } catch (error) {
      this.userService.find();
    }
  }

  async findOne(param: string, value: string) {
    try {
      const user = await this.userService.findOne({ [param]: value });

      if (!user) throw new NotFoundException('El usuario no existe');

      return user;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateAuthDto) {
    try {
      const user = await this.findOne('_id', id);
      if (!user) throw new NotFoundException('El usuario no existe');

      return this.userService.findByIdAndUpdate(
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
      const user = await this.findOne('_id', id);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      return await this.userService.findByIdAndDelete(id);
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
    throw new InternalServerErrorException(
      'No se pudo crear el genero - Revisar la consola',
    );
  }
}
