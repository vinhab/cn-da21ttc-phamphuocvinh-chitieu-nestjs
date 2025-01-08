import { Controller, Get, Param } from '@nestjs/common';
import { MonthlySummaryService } from './monthly-summary.service';

@Controller('monthly-summary')
export class MonthlySummaryController {
  constructor(private readonly monthlySummaryService: MonthlySummaryService) {}

  // API để lấy tổng hợp khuyến nghị chi tiêu cho tháng hiện tại của người dùng
  @Get(':userId')
  async getMonthlySummary(@Param('userId') userId: string) {
    return this.monthlySummaryService.getMonthlySummary(userId);
  }
}
