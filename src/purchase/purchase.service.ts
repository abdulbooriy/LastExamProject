import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto, req: Request) {
    try {
      let user = req['user'];

      const findProduct = await this.prisma.product.findFirst({
        where: { id: createPurchaseDto.productId },
      });

      const checkUser = await this.prisma.users.findFirst({
        where: { id: user.id },
      });
      if (!checkUser) throw new NotFoundException('User not found!');

      const checkPartner = await this.prisma.partners.findFirst({
        where: { id: createPurchaseDto.partnerId },
      });
      if (!checkPartner) throw new NotFoundException('Partner not found!');

      const checkProduct = await this.prisma.product.findFirst({
        where: { id: createPurchaseDto.productId },
      });
      if (!checkProduct) throw new NotFoundException('Product not found!');

      const new_purchase = await this.prisma.purchase.create({
        data: {
          userId: user.id,
          partnerId: createPurchaseDto.partnerId,
          productId: createPurchaseDto.productId,
          quantity: findProduct?.quantity,
          buyPrice: findProduct?.sellPrice,
          comment: createPurchaseDto.comment,
        },
      });

      return { message: 'Purchase created successfully!', data: new_purchase };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.purchase.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const purchase = await this.prisma.purchase.findFirst({ where: { id } });
      if (!purchase) throw new NotFoundException('Purchase not found!');

      return purchase;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const purchase = await this.prisma.purchase.findFirst({ where: { id } });
      if (!purchase) throw new NotFoundException('Purchase not found!');

      await this.prisma.purchase.delete({ where: { id } });
      return { message: 'Purchase is successfully deleted!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
