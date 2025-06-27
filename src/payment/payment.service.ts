import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, req: Request) {
    try {
      const user = req['user'];
      if (user) throw new NotFoundException('User not found!');

      const findPartner = await this.prisma.partners.findUnique({
        where: { id: createPaymentDto.partnerId },
      });
      if (!findPartner) throw new NotFoundException('Partner not found!');

      const findDebt = await this.prisma.debt.findUnique({
        where: { id: createPaymentDto.debtId },
      });
      if (!findDebt) throw new NotFoundException('Debt not found!');

      const created_payment = await this.prisma.$transaction(async (tx) => {
        const new_payment = await tx.payment.create({
          data: {
            partnerId: createPaymentDto.partnerId,
            debtId: createPaymentDto.debtId,
            userId: user?.id,
            amount: Number(findDebt.total),
            comment: createPaymentDto.comment,
            paymentType: createPaymentDto.paymentType,
            type: createPaymentDto.type,
          },
        });

        const changebalance =
          createPaymentDto.type === 'IN'
            ? createPaymentDto.amount + createPaymentDto.amount
            : createPaymentDto.amount - createPaymentDto.amount;

        const updated_partner = await tx.partners.update({
          where: { id: createPaymentDto.partnerId },
          data: {
            balance: {
              increment: changebalance,
            },
          },
        });

        return new_payment;
      });

      return created_payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.payment.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const payment = await this.prisma.payment.findFirst({ where: { id } });
      if (!payment) throw new NotFoundException('Payment not found!');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
