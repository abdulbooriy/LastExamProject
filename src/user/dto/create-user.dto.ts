import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum UserRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Nurulloh Mahmitjanov' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+998931416717' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: UserRole.STAFF })
  @IsString()
  @IsNotEmpty()
  role: UserRole;

  status: UserStatus.ACTIVE;

  @ApiProperty({ example: 'user avatar image url' })
  @IsString()
  @IsOptional()
  avatar?: string;
}
