import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReturnProductDto {
  @ApiProperty({ example: 'contract_uuid' })
  @IsString()
  @IsNotEmpty()
  contractId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isNew: boolean;

  @ApiProperty({ example: 'reason for product' })
  @IsString()
  @IsOptional()
  reason: string;
}
