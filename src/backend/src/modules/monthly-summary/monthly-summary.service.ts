import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from '../income/schemas/income.schema';
import { Expense } from '../expense/schemas/expense.schema';
import { SavingsGoal, SavingsGoalModel } from '../saving/schemas/saving.schema';

@Injectable()
export class MonthlySummaryService {
  private readonly logger = new Logger(MonthlySummaryService.name);

  constructor(
    @InjectModel(Income.name) private incomeModel: Model<Income>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(SavingsGoalModel.modelName) private savingsGoalRepository: Model<SavingsGoal>,
  ) {}

  // Phương thức tổng hợp thông tin chi tiêu, thu nhập, mục tiêu tiết kiệm và khuyến nghị
  async getMonthlySummary(userId: string): Promise<any> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based month
    const currentYear = currentDate.getFullYear();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Lấy tổng thu nhập trong tháng hiện tại
    const totalIncomeResult = await this.incomeModel.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: startOfMonth, // Ngày bắt đầu tháng
            $lt: endOfMonth, // Ngày kết thúc tháng
          },
        },
      },
      {
        $group: { _id: null, totalIncome: { $sum: "$amount" } },
      },
    ]);

    if (!totalIncomeResult.length) {
      throw new NotFoundException('No income records found for this user');
    }

    const totalIncome = totalIncomeResult[0].totalIncome;

    // Kiểm tra dữ liệu mục tiêu tiết kiệm trong tháng hiện tại
    let savingsGoal = await this.savingsGoalRepository.findOne({
      userId,
      monthYear: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`,
    });

    if (!savingsGoal) {
      // Nếu không có mục tiêu tiết kiệm, tạo mục tiêu tiết kiệm mặc định
      this.logger.warn(`No savings goal found for user ${userId}, creating default savings goal`);
      savingsGoal = new this.savingsGoalRepository({
        userId,
        monthYear: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`,
        targetAmount: 5000, // Mức tiết kiệm mặc định, bạn có thể thay đổi theo yêu cầu
      });
      await savingsGoal.save();
      this.logger.log(`Default savings goal created for user ${userId}`);
    }

    const targetSavings = savingsGoal.targetAmount;

    // Lấy tổng chi tiêu trong tháng hiện tại
    const totalExpenseResult = await this.expenseModel.aggregate([
      {
        $match: {
        userId,
        date: {
          $gte: startOfMonth, // Ngày bắt đầu tháng
          $lt: endOfMonth, // Ngày kết thúc tháng
        },
      },
    },
    {
      $group: { _id: null, totalExpense: { $sum: "$amount" } },
    },
  ]);

    if (!totalExpenseResult.length) {
      throw new NotFoundException('No expense records found for this user');
    }

    const totalExpense = totalExpenseResult[0].totalExpense;

    // Giả sử tỷ lệ chi tiêu khuyến nghị là 70% thu nhập sau khi trừ mục tiêu tiết kiệm
    const recommendedSpending = totalIncome * 0.7 - targetSavings / 12;

    // Đảm bảo mức chi tiêu không vượt quá tổng thu nhập trừ đi chi tiêu đã thực hiện
    const finalRecommendedSpending = Math.min(recommendedSpending, totalIncome - totalExpense);

    return {
      totalIncome,
      totalExpense,
      targetSavings,
      recommendedSpending: finalRecommendedSpending,
    };
  }
}
