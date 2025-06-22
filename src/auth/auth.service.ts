import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async finduser(phone: string) {
    try {
      return this.prisma.users.findFirst({ where: { phone } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto, request: Request) {
    try {
      const checkUser = await this.finduser(loginDto.phone);
      if (!checkUser) throw new BadRequestException('Wrong PhoneNumber!');

      if (checkUser.password == loginDto.password) {
        if (checkUser.status == 'INACTIVE') {
          await this.prisma.users.update({
            data: { status: 'ACTIVE' },
            where: { phone: checkUser.phone },
          });
        }

        await bcrypt.hash(loginDto.password, 10);

        let access_token = await this.generateAccesstoken({
          id: checkUser.id,
          role: checkUser.role,
        });

        let refresh_token = await this.generateRefreshToken({
          id: checkUser.id,
          role: checkUser.role,
        });

        return { access_token, refresh_token };
      } else {
        throw new BadRequestException('Wrong Password!');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateAccesstoken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '12h',
    });
  }

  async generateRefreshToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: '7d',
    });
  }
}
