import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum PartnerRole {
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

export class CreatePartnerDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+998507525150' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'user_uuid' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  balance: number;

  @ApiProperty({ example: PartnerRole.SELLER })
  @IsString()
  @IsNotEmpty()
  role: PartnerRole;

  @ApiProperty({ example: 'Tashkent, Uzbekistan' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
