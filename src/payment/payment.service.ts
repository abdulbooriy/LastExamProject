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
        if (createPaymentDto.type === 'IN') {
          const new_payment = await tx.payment.create({
            data: {
              partnerId: createPaymentDto.partnerId,
              debtId: createPaymentDto.debtId,
              userId: user?.id,
              amount: Number(createPaymentDto.amount),
              comment: createPaymentDto.comment,
              paymentType: createPaymentDto.paymentType,
              type: createPaymentDto.type,
            },
          });

          await tx.debt.update({
            where: { id: createPaymentDto.debtId },
            data: {
              total: findDebt.total - new_payment.amount,
              duration: findDebt.duration - findDebt.total,
              status: 'PAID',
            },
          });

          await tx.partners.update({
            where: { id: createPaymentDto.partnerId },
            data: { balance: { increment: createPaymentDto.amount } },
          });

          return new_payment;
        }
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
      const payment = await this.prisma.payment.findFirst({
        where: { id },
        include: { debt: true, partner: true },
      });
      if (!payment) throw new NotFoundException('Payment not found!');

      return payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
