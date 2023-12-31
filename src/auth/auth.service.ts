import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userService: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateAuthDto) {
    try {
      const userCreated = {
        ...dto,
        password: bcrypt.hashSync(dto.password, 10),
      };
      const user = await this.userService.create(userCreated);
      const userWithImportantInfo = {
        email: user.email,
        _id: user._id,
      };

      return {
        user: userWithImportantInfo,
        token: await this.signInToken(
          user._id.toString(),
          user.email,
          user.fullname,
        ),
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async login(dto: LoginAuthDto) {
    try {
      const user = await this.userService.findOne(
        { email: dto.email },
        { email: 1, password: 1 },
      );
      if (!user) throw new NotFoundException('Credenciales incorrectas');

      const pwdMatch = bcrypt.compareSync(dto.password, user.password);
      if (!pwdMatch) throw new NotFoundException('Credenciales incorrectas');

      const userWithoutPassword = {
        _id: user._id,
        email: user.email,
      };

      return {
        user: userWithoutPassword,
        token: await this.signInToken(
          user._id.toString(),
          user.email,
          user.fullname,
        ),
      };
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
      let password: string = dto.password;

      if (dto.password) password = bcrypt.hashSync(dto.password, 10);

      if (!user) throw new NotFoundException('El usuario no existe');
      const userUpdated = { ...dto, password, updatedAt: new Date() };

      return this.userService.findByIdAndUpdate(id, userUpdated, { new: true });
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
        `El usuario ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }

    console.log(error);
    throw new BadRequestException(error);
  }

  async signInToken(userId: string, email: string, name: string) {
    const payload = {
      id: userId,
      email,
      name,
    };

    const secret = process.env.SECRET_KEY;
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '72h',
      secret,
    });
    return token;
  }
}
