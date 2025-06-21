import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { SendOtpDto } from './dto/sendOTP.dto';
import { VerifyOtpDto } from './dto/verifyOTP.dto';
import { Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  sendOTP(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOTP(sendOtpDto);
  }

  @Post('verify-otp')
  verifyOTP(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post()
  login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return this.authService.login(loginDto, request);
  }
}
