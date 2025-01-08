import { Schema, Document, model } from 'mongoose';

// Định nghĩa Schema cho SavingsGoal
export const SavingsGoalSchema = new Schema({
  userId: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  monthYear: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Định nghĩa Model cho SavingsGoal
export const SavingsGoalModel = model('SavingsGoal', SavingsGoalSchema);

// Định nghĩa interface để sử dụng với TypeScript
export interface SavingsGoal extends Document {
  userId: string;
  targetAmount: number;
  monthYear: string;
  createdAt: Date;
  updatedAt: Date;
}
