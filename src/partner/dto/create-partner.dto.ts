import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum PartnerRole {
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

export class CreatePartnerDto {
  @ApiProperty({ example: 'full_name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'phone_number' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  userId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  balance: number;

  @ApiProperty({ example: PartnerRole.SELLER })
  @IsString()
  @IsNotEmpty()
  role: PartnerRole;

  @ApiProperty({ example: 'address' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
