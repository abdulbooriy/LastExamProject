import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/role.decorator';
import { UserRole } from 'src/user/dto/create-user.dto';
import { Request } from 'express';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Req() req: Request,
  ) {
    return this.purchaseService.create(createPurchaseDto, req);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
