import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendOtpDto } from './dto/sendOTP.dto';
import { MailService } from 'src/mail/mail.service';
import { totp } from 'otplib';
import { VerifyOtpDto } from './dto/verifyOTP.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async finduser(email: string) {
    try {
      return this.prisma.user.findFirst({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendOTP(sendOtpDto: SendOtpDto) {
    const { email } = sendOtpDto;
    totp.options = { digits: 6, step: 1800 };
    try {
      let otp = totp.generate(`${process.env.OTP_SECRET_KEY}_${email}`);
      await this.mailService.sendMail(
        email,
        'ONE-TIME PASSWORD',
        `This is an OTP to activate your account: <h1>${otp}</h1>`,
      );

      return {
        message: `We send an OTP to this ${email}, Please active your account`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyOTP(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    try {
      let checkEmail = await this.prisma.user.findFirst({ where: { email } });

      let checkOTP = totp.verify({
        token: otp,
        secret: `${process.env.OTP_SECRET_KEY}_${email}`,
      });
      if (!checkOTP) throw new BadRequestException('Wrong Email or OTP code!');

      if (checkEmail?.status == 'INACTIVE') {
        await this.prisma.user.update({
          data: { status: 'ACTIVE' },
          where: { email },
        });
      }

      return { message: 'Your account verified successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      let checkUser = await this.finduser(registerDto.email);
      if (checkUser)
        return { message: `This ${registerDto.email} is already exists!` };

      let hashPass = bcrypt.hashSync(registerDto.password, 10);

      const data = {
        ...registerDto,
        password: hashPass,
      };

      await this.prisma.user.create({ data });
      return { message: 'You are registered successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto, request: Request) {
    try {
      const checkEmail = await this.finduser(loginDto.email);
      if (!checkEmail) throw new BadRequestException('Wrong Email address!');

      const checkPassword = bcrypt.compare(
        checkEmail.password,
        loginDto.password,
      );
      if (!checkPassword) throw new BadRequestException('Wrong Password!');

      if (checkEmail.status == 'INACTIVE')
        return { message: 'You should activate your account!' };

      const checkSessions = await this.prisma.sessions.findFirst({
        where: { userId: checkEmail.id, ipAddress: request.ip },
      });

      console.log(checkSessions);

      let access_token = await this.generateAccesstoken({
        id: checkEmail.id,
        role: checkEmail.role,
      });

      let refresh_token = await this.generateRefreshToken({
        id: checkEmail.id,
        role: checkEmail.role,
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
