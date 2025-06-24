import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ example: 'partner_uuid' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'product_uuid' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  buyPrice: number;

  @ApiProperty({ example: 'comments for purchase' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
