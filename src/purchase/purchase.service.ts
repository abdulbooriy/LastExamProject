import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto, req: Request) {
    try {
      let user = req['user'];

      const findProduct = await this.prisma.product.findUnique({
        where: { id: createPurchaseDto.productId },
      });
      if (!findProduct || !findProduct.sellPrice)
        throw new NotFoundException('Product not found!');

      const checkUser = await this.prisma.users.findFirst({
        where: { id: user.id },
      });
      if (!checkUser) throw new NotFoundException('User not found!');

      const checkPartner = await this.prisma.partners.findFirst({
        where: { id: createPurchaseDto.partnerId },
      });
      if (!checkPartner) throw new NotFoundException('Partner not found!');

      const quantity = Number(createPurchaseDto.quantity);
      const buyPrice = Number(createPurchaseDto.buyPrice);
      const oldQuantity = Number(findProduct.quantity);
      const oldBuyPrice = Number(findProduct.buyPrice);

      const totalCost = oldQuantity * buyPrice;
      const productBuyPrice = oldQuantity * oldBuyPrice;
      const purchaseBuyPrice = quantity * buyPrice;
      const totalQuantity = oldQuantity + quantity;
      const totalPrice = (productBuyPrice + purchaseBuyPrice) / totalQuantity;

      const created_purchase = await this.prisma.$transaction(async (tx) => {
        const new_purchase = await tx.purchase.create({
          data: {
            userId: user?.id,
            partnerId: createPurchaseDto.partnerId,
            productId: createPurchaseDto.productId,
            quantity: oldQuantity ?? quantity,
            buyPrice: oldBuyPrice ?? buyPrice,
            comment: createPurchaseDto.comment,
          },
        });

        await tx.product.update({
          where: { id: createPurchaseDto.productId },
          data: { buyPrice: totalPrice },
        });

        await tx.partners.update({
          where: { id: createPurchaseDto.partnerId },
          data: {
            balance: {
              increment: Number(totalCost),
            },
          },
        });

        return new_purchase;
      });

      return { data: created_purchase, totalCost };
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
      const purchase = await this.prisma.purchase.findFirst({
        where: { id },
        include: { user: true, partner: true, product: true },
      });
      if (!purchase) throw new NotFoundException('Purchase not found!');

      return purchase;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
