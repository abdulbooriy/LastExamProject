import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/role.decorator';
import { UserRole } from 'src/user/dto/create-user.dto';
import { Request } from 'express';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Roles(UserRole.OWNER, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createContractDto: CreateContractDto, @Req() req: Request) {
    return this.contractService.create(createContractDto, req);
  }

  @Roles(UserRole.OWNER, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }
}
