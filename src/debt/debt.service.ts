import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const debts = await this.prisma.debt.findMany();
      return debts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const debt = await this.prisma.debt.findUnique({ where: { id } });
      if (!debt) throw new NotFoundException('Debt not found!');

      return debt;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
