import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReturnProductDto } from './create-return_product.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateReturnProductDto extends PartialType(
  CreateReturnProductDto,
) {
  @ApiProperty({ example: 'contract_uuid' })
  @IsString()
  @IsOptional()
  contractId?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isNew?: boolean;

  @ApiProperty({ example: 'reason for return_product' })
  @IsString()
  @IsOptional()
  reason?: string;
}
