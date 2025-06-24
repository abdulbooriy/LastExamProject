import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

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

  async login(loginDto: LoginDto) {
    try {
      const checkUser = await this.finduser(loginDto.phone);
      if (!checkUser) throw new BadRequestException('Wrong PhoneNumber!');

      const checkPassword = await bcrypt.compare(
        loginDto.password,
        checkUser.password,
      );
      console.log(loginDto.password);
      console.log(checkPassword);

      if (!checkPassword) throw new BadRequestException('Wrong Password!');

      let access_token = await this.generateAccesstoken({
        id: checkUser.id,
        role: checkUser.role,
      });

      let refresh_token = await this.generateRefreshToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      return { access_token, refresh_token };
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
