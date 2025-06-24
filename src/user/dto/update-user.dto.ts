import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserRole } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Nurulloh Mahmitjanov' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: '+998931416717' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: UserRole.STAFF })
  @IsString()
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ default: 0 })
  balance?: Decimal;

  @ApiProperty({ example: 'user avatar image url' })
  @IsString()
  @IsOptional()
  avatar?: string;
}
