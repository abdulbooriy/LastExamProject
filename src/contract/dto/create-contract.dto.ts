import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

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
  quantity: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  sellPrice: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  duration: number;
}
