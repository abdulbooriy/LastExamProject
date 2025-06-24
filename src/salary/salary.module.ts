import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';

@Module({
  imports: [],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
