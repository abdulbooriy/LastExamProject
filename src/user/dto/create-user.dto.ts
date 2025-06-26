import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum UserRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateUserDto {
  @ApiProperty({ example: 'full_name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'phone_number' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: UserRole.STAFF })
  @IsString()
  @IsNotEmpty()
  role: UserRole;

  status: UserStatus.ACTIVE;

  @ApiProperty({ example: 0, default: 0 })
  @Type(() => Number)
  @IsNumber()
  balance: number;

  @ApiProperty({ example: 'user avatar image url' })
  @IsString()
  @IsOptional()
  avatar?: string;
}
