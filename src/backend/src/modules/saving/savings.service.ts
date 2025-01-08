import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavingsGoal } from './schemas/saving.schema';  // Đảm bảo sử dụng SavingsGoal interface đúng
import { SavingsGoalModel } from './schemas/saving.schema'; // Đảm bảo sử dụng SavingsGoalModel đúng cách

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectModel(SavingsGoalModel.modelName) private savingsGoalModel: Model<SavingsGoal>, // Dùng model đúng
  ) {}

  // Thêm mục tiêu tiết kiệm mới hoặc cập nhật nếu đã tồn tại
  async setSavingsGoal(userId: string, targetAmount: number, monthYear: string): Promise<SavingsGoal> {
    const existingGoal = await this.savingsGoalModel.findOne({ userId, monthYear });

    if (existingGoal) {
      existingGoal.targetAmount = targetAmount;
      existingGoal.updatedAt = new Date();
      return existingGoal.save();
    }

    const newGoal = new this.savingsGoalModel({
      userId,
      targetAmount,
      monthYear,
    });

    return newGoal.save();
  }

  // Lấy mục tiêu tiết kiệm theo userId và monthYear
  async getSavingsGoal(userId: string, monthYear: string): Promise<SavingsGoal> {
    return this.savingsGoalModel.findOne({ userId, monthYear });
  }
}
