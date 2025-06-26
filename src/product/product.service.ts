import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, req: Request) {
    try {
      const user = req['user'];

      let category = await this.prisma.category.findFirst({
        where: { id: createProductDto.categoryId },
      });
      if (!category)
        throw new BadRequestException('This categoryId is not exists!');

      let findUser = await this.prisma.users.findFirst({
        where: { id: user.id },
      });
      if (!findUser)
        throw new BadRequestException('This userId is not exists!');

      const products = await this.prisma.product.create({
        data: createProductDto,
      });

      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany();
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
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
          category: true,
          user: true,
          Purchase: {
            select: {
              id: true,
              quantity: true,
              buyPrice: true,
              comment: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  phone: true,
                  role: true,
                  status: true,
                  balance: true,
                  avatar: true,
                },
              },
              partner: {
                select: {
                  id: true,
                  fullName: true,
                  phone: true,
                  isActive: true,
                  balance: true,
                  role: true,
                  address: true,
                  user: {
                    select: {
                      id: true,
                      fullName: true,
                      phone: true,
                      role: true,
                      status: true,
                      balance: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!product) throw new NotFoundException('Product not found!');

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.findFirst({ where: { id } });
      if (!product) throw new NotFoundException('Product not found!');

      let imagePath = join(__dirname, '../../uploads', product.image);

      const new_product = await this.prisma.product.update({
        data: updateProductDto,
        where: { id },
      });

      fs.unlink(imagePath, (e) => {
        console.log(e ? e.message : 'product image deleted!');
      });

      return new_product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findFirst({ where: { id } });
      if (!product) throw new NotFoundException('Product not found!');

      let imagePath = join(__dirname, '../../uploads', product.image);

      await this.prisma.product.delete({ where: { id } });
      fs.unlink(imagePath, (e) => {
        console.log(e ? e.message : 'product image deleted!');
      });

      return { message: 'Product is successfully deleted!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
