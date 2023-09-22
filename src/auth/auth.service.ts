import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAuthDto, UpdateAuthDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authService: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = this.authService.create({ ...createAuthDto });
    await this.authService.save(user);
    return user;
  }

  findAll() {
    return this.authService.find();
  }

  async findOne(param: string, value: string) {
    let queryBuilder = this.authService.createQueryBuilder('user');

    switch (param) {
      case 'email':
        queryBuilder = queryBuilder.where('user.email = :value', { value });
        break;
      case 'username':
        queryBuilder = queryBuilder.where('user.username = :value', { value });
        break;
      case 'id':
        queryBuilder = queryBuilder.where('user.id = :value', { value });
        break;

      default:
        throw new BadRequestException('Parametro no valida para la busqueda');
    }

    const user = await queryBuilder.getOne();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne('id', id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    Object.assign(user, updateAuthDto);
    return await this.authService.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne('id', id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return await this.authService.remove(user);
  }
}
