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

      await this.prisma.$transaction(async (tx) => {
        const new_contract = await tx.contract.create({
          data: {
            partnerId: createContractDto.partnerId,
            productId: createContractDto.productId,
            userId: user.id,
            quantity: createContractDto.quantity,
            sellPrice: product.sellPrice,
            duration: createContractDto.duration,
          },
        });

        await tx.partners.update({
          where: { id: createContractDto.partnerId },
          data: {
            balance: partner.balance.plus(
              new_contract.quantity * Number(new_contract.sellPrice),
            ),
          },
        });

        await tx.debt.create({
          data: {
            contractId: new_contract.id,
            total: new_contract.quantity * Number(new_contract.sellPrice),
            duration: createContractDto.duration,
          },
        });
      });

      return {
        message: 'Contract created successfully!',
      };
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
