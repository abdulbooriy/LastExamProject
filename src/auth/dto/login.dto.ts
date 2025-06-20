import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString({ message: 'Email must be a string!' })
  @IsNotEmpty({ message: 'Email is reduired!' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user12345' })
  @IsString({ message: 'Password must be a string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
