import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
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
