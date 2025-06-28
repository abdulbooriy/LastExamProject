import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto, req: Request) {
    try {
      const user = req['user'];

      const product = await this.prisma.product.findUnique({
        where: { id: createContractDto.productId },
      });
      if (!product) throw new NotFoundException('Product not found!');

      if (createContractDto.quantity > product?.quantity)
        throw new BadRequestException('Not enough product stock!');

      const partner = await this.prisma.partners.findUnique({
        where: { id: createContractDto.partnerId },
      });
      if (!partner) throw new NotFoundException('Partner not found!');

      const category = await this.prisma.category.findFirst({
        where: { time: createContractDto.duration },
      });
      if (!category) throw new NotFoundException('Category time not found!');

      const created_contract = await this.prisma.$transaction(async (tx) => {
        const new_contract = await tx.contract.create({
          data: {
            partnerId: createContractDto.partnerId,
            productId: createContractDto.productId,
            userId: user.id,
            quantity: Number(createContractDto.quantity),
            sellPrice: Number(product.sellPrice ?? 0),
            duration: createContractDto.duration ?? Number(category.time),
          },
        });

        await tx.partners.update({
          where: { id: createContractDto.partnerId },
          data: {
            balance:
              partner.balance -
              new_contract.quantity * Number(new_contract.sellPrice),
          },
        });

        const totalAmount = new_contract.quantity * Number(new_contract.sellPrice);
        const monthlyPayment = Math.floor(totalAmount / new_contract.duration)

        await tx.debt.create({
          data: {
            contractId: new_contract?.id,
            total: new_contract?.quantity * Number(new_contract.sellPrice),
            duration: new_contract.duration,
            monthlyPaymentAmount: monthlyPayment
          },
        });

        return new_contract;
      });

      return created_contract;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const contracts = await this.prisma.contract.findMany();
      return contracts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const contract = await this.prisma.contract.findUnique({
        where: { id },
        include: { partner: true, product: true },
      });
      if (!contract) throw new NotFoundException('Contract not found!');

      return contract;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
