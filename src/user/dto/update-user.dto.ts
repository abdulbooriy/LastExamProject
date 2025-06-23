import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserStatus } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Nurulloh Mahmitjanov' })
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({ example: '+998931416717' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  password?: string;

//   @ApiProperty({ example: UserRole.STAFF })
//   @IsString()
//   @IsNotEmpty()
//   role?: UserRole;

  status?: UserStatus.ACTIVE;

  @ApiProperty({ default: 0 })
  balance?: Decimal;

  @ApiProperty({ example: 'user avatar image url' })
  @IsString()
  @IsNotEmpty()
  avatar?: string;
}
