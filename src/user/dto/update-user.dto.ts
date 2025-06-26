import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserRole } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'full_name' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: 'phone_number' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: UserRole.STAFF })
  @IsString()
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ example: 'user avatar image url' })
  @IsString()
  @IsOptional()
  avatar?: string;
}
