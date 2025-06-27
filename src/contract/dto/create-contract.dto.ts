import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 'partner_uuid' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'product_uuid' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  sellPrice: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration: number;
}
