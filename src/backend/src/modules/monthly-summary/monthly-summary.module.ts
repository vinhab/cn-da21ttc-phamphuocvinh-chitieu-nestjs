import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlySummaryService } from './monthly-summary.service';
import { MonthlySummaryController } from './monthly-summary.controller';
import { IncomeModule } from '../income/income.module';  // Import IncomeModule
import { ExpenseModule } from '../expense/expense.module';
import { SavingsGoalModule } from '../saving/savings.module';
import { Income, IncomeSchema } from '../income/schemas/income.schema';
import { Expense, ExpenseSchema } from '../expense/schemas/expense.schema';
import { SavingsGoalModel, SavingsGoalSchema } from '../saving/schemas/saving.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Income.name, schema: IncomeSchema },
      { name: Expense.name, schema: ExpenseSchema },
      { name: SavingsGoalModel.modelName, schema: SavingsGoalSchema },
    ]),
    IncomeModule,  // Đảm bảo IncomeModule được import vào đây
  ],
  controllers: [MonthlySummaryController],
  providers: [MonthlySummaryService],
})
export class MonthlySummaryModule {}
