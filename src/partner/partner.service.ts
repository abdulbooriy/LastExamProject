import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto, PartnerRole } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto, req: Request) {
    try {
      const user = req['user'];

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
      if (!checkUserId) throw new NotFoundException('user not found!');

      if (
        createPartnerDto.role !== PartnerRole.CUSTOMER &&
        createPartnerDto.role !== PartnerRole.SELLER
      )
        throw new BadRequestException(
          `The provided (${createPartnerDto.role}) is invalid! Only the following roles allowd. CUSTOMER, SELLER`,
        );

      const new_partners = await this.prisma.partners.create({
        data: {
          fullName: createPartnerDto.fullName,
          phone: createPartnerDto.phone,
          userId: user?.id,
          isActive: createPartnerDto.isActive,
          balance: Number(createPartnerDto?.balance ?? 0),
          role: createPartnerDto.role,
          address: createPartnerDto.address,
        },
      });

      return new_partners;
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
      const partner = await this.prisma.partners.findFirst({
        where: { id },
        select: {
          id: true,
          fullName: true,
          phone: true,
          isActive: true,
          balance: true,
          role: true,
          address: true,
          Purchase: {
            select: {
              id: true,
              quantity: true,
              buyPrice: true,
              comment: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  sellPrice: true,
                  buyPrice: true,
                  quantity: true,
                  units: true,
                  isActive: true,
                  comment: true,
                  image: true,
                  category: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              role: true,
              status: true,
              balance: true,
              avatar: true,
            },
          },
        },
      });
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

      return updated_partner;
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
