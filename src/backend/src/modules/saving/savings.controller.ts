import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SavingsGoalService } from './savings.service';
import { SavingsGoal } from './schemas/saving.schema';

@Controller('savings-goal')
export class SavingsGoalController {
  constructor(private readonly savingsGoalService: SavingsGoalService) {}

  // Đặt mục tiêu tiết kiệm cho người dùng
  @Post()
  async setSavingsGoal(
    @Body('userId') userId: string,
    @Body('targetAmount') targetAmount: number,
    @Body('monthYear') monthYear: string,
  ): Promise<SavingsGoal> {
    return this.savingsGoalService.setSavingsGoal(userId, targetAmount, monthYear);
  }

  // Lấy mục tiêu tiết kiệm của người dùng
  @Get(':userId/:monthYear')
  async getSavingsGoal(
    @Param('userId') userId: string,
    @Param('monthYear') monthYear: string,
  ): Promise<SavingsGoal> {
    return this.savingsGoalService.getSavingsGoal(userId, monthYear);
  }
}
