import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReturnProductDto } from './dto/create-return_product.dto';
import { UpdateReturnProductDto } from './dto/update-return_product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReturnProductService {
  constructor(private prisma: PrismaService) {}

  async create(createReturnProductDto: CreateReturnProductDto) {
    try {
      const findContract = await this.prisma.contract.findUnique({
        where: { id: createReturnProductDto.contractId },
      });
      if (!findContract) throw new NotFoundException('Contract not found!');

      if (createReturnProductDto.isNew === false) {
        const updated_partner_balance = await this.prisma.partners.update({
          where: { id: findContract.partnerId },
          data: {
            balance: {
              increment: findContract.sellPrice,
            },
          },
        });
      }
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

  async update(id: string, updateReturnProductDto: UpdateReturnProductDto) {
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
