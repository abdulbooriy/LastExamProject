import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkUser = await this.prisma.users.findUnique({
        where: { phone: createUserDto.phone },
      });

      if (checkUser)
        throw new BadRequestException(
          `This ${checkUser?.phone} PhoneNumber is already in use!`,
        );

      const hashPass = await bcrypt.hash(createUserDto.password, 10);

      const new_user = await this.prisma.users.create({
        data: { ...createUserDto, password: hashPass },
      });

      return { message: 'User created successfully!', data: new_user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.users.findMany();
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id } });
      if (!user) throw new NotFoundException('User not found!');

      return { user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id } });
      if (!user) throw new NotFoundException('User not found!');

      const new_user = await this.prisma.users.update({
        data: updateUserDto,
        where: { id },
      });

      return { message: 'User is successfully updated!', data: new_user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id } });
      if (!user) throw new NotFoundException('User not found!');

      let imagePath = join(__dirname, '../../uploads', user.avatar || '');

      await this.prisma.users.delete({ where: { id } });
      fs.unlink(imagePath, (e) => {
        console.log(e ? e.message : 'user avatar deleted!');
      });

      return { message: 'User is successfully deleted' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
