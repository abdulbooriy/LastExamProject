import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendOtpDto } from './dto/sendOTP.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async sendOTP(sendOtpDto: SendOtpDto) {
    try {
      const { email } = sendOtpDto;
      console.log(email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async finduser(email: string) {
    try {
      return this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
