import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      const new_salary = await this.prisma.salary.create({
        data: {
          userId: createSalaryDto.userId,
          amount: Number(createSalaryDto?.amount),
          comment: createSalaryDto.comment,
        },
      });

      await this.prisma.users.update({
        data: { balance: createSalaryDto.amount },
        where: { id: createSalaryDto.userId },
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
      const salary = await this.prisma.salary.findFirst({ where: { id } });
      if (!salary) throw new BadRequestException('Salary not found!');

      return salary;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
