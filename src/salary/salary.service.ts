import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      const finduser = await this.prisma.users.findUnique({
        where: { id: createSalaryDto.userId },
      });
      if (!finduser) throw new NotFoundException('User not found');

      const new_salary = await this.prisma.salary.create({
        data: {
          userId: createSalaryDto.userId,
          amount: Number(createSalaryDto?.amount),
          comment: createSalaryDto.comment,
        },
      });

      await this.prisma.users.update({
        where: { id: createSalaryDto.userId },
        data: { balance: { increment: createSalaryDto.amount } },
      });

      return new_salary;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const salary = await this.prisma.salary.findMany();
      return salary;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const salary = await this.prisma.salary.findFirst({
        where: { id },
        select: {
          id: true,
          amount: true,
          comment: true,
          user: {
            omit: {
              password: true,
            },
          },
        },
      });
      if (!salary) throw new NotFoundException('Salary not found!');

      return salary;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
