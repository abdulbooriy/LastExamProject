import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const categories = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return categories;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.prisma.category.findFirst({
        where: { id },
        include: {
          Product: {
            select: {
              id: true,
              title: true,
              sellPrice: true,
              buyPrice: true,
              quantity: true,
              units: true,
              isActive: true,
              comment: true,
              image: true,
              userId: true,
            },
          },
        },
      });
      if (!category) throw new BadRequestException('Category not found!');

      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.findFirst({ where: { id } });
      if (!category) throw new BadRequestException('Category not found!');

      let imagePath = join(__dirname, '../../uploads', category.image);

      const categories = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      fs.unlink(imagePath, (e) => {
        console.log(e ? e.message : 'category image deleted!');
      });

      return { message: 'Category is successfully updated!', data: categories };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.prisma.category.findFirst({ where: { id } });
      if (!category) throw new BadRequestException('Category not found!');

      let imagePath = join(__dirname, '../../uploads', category?.image);

      await this.prisma.category.delete({ where: { id } });
      fs.unlink(imagePath, (e) => {
        console.log(e ? e.message : 'category image deleted');
      });

      return { message: 'Category is successfully deleted!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
