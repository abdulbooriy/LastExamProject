import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DebtService } from './debt.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/role.decorator';
import { UserRole } from 'src/user/dto/create-user.dto';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.debtService.findAll();
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }
}
