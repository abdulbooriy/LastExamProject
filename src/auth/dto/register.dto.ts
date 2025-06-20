import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export enum UserRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}

export class RegisterDto {
  @ApiProperty({ example: 'Abdulboriy Mahamatjanov' })
  @IsString({ message: 'FullName must be a string!' })
  @IsNotEmpty({ message: 'FullName is required !' })
  fullName: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString({ message: 'Email must be a string!' })
  @IsNotEmpty({ message: 'Email is reduired!' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user12345' })
  @IsString({ message: 'Password must be a string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  @ApiProperty({ example: 'Your avatar image url' })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({ example: 'OWNER' })
  @IsString({ message: 'Role must be a string!' })
  @IsNotEmpty({ message: 'Role is required!' })
  role: UserRole;

  status: boolean;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Balance must be a positive number!' })
  balance: Decimal;
}
