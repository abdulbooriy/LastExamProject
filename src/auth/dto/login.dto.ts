import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'phone number' })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty({ message: 'Phone Number is reduired!' })
  phone: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'Password must be a string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
