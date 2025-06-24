import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { Request } from 'express';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto, req: Request) {
    try {
      const user = req['user'];

      console.log(user);

      const checkPartner = await this.prisma.partners.findUnique({
        where: { phone: createPartnerDto.phone },
      });

      if (checkPartner)
        throw new BadRequestException(
          `This ${checkPartner.phone} is already exists`,
        );

      const checkUserId = await this.prisma.users.findFirst({
        where: { id: user.id },
      });
      if (!checkUserId) throw new NotFoundException('userId not found!');

      const new_partners = await this.prisma.partners.create({
        data: {
          fullName: createPartnerDto.fullName,
          phone: createPartnerDto.phone,
          userId: user?.id,
          isActive: createPartnerDto.isActive,
          balance: new Prisma.Decimal(createPartnerDto.balance),
          role: createPartnerDto.role,
          address: createPartnerDto.address,
        },
      });

      return { message: 'Partner successfully created!', data: new_partners };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.partners.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const partner = await this.prisma.partners.findFirst({ where: { id } });
      if (!partner) throw new BadRequestException('Partner not found');

      return partner;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const partner = await this.prisma.partners.findFirst({ where: { id } });
      if (!partner) throw new BadRequestException('Partner not found');

      const updated_partner = await this.prisma.partners.update({
        data: updatePartnerDto,
        where: { id },
      });

      return {
        message: 'Partner updated successfully!',
        data: updated_partner,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const partner = await this.prisma.partners.findFirst({ where: { id } });
      if (!partner) throw new BadRequestException('Partner not found');

      await this.prisma.partners.delete({ where: { id } });
      return { message: 'Partner deleted successfully!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
