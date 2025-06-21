import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: 'your email address' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'otp code' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}
