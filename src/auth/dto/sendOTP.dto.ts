import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString({ message: 'Email must be a string!' })
  @IsNotEmpty({ message: 'Email is reduired!' })
  @IsEmail()
  email: string;
}
