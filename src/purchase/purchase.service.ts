import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const findProductQuantity = await this.prisma.product.findFirst({
        where: { quantity: createPurchaseDto.quantity },
      });
      console.log(findProductQuantity);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
