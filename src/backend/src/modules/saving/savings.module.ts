import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingsGoalService } from './savings.service';
import { SavingsGoalController } from './savings.controller';
import { SavingsGoalModel, SavingsGoalSchema } from './schemas/saving.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SavingsGoalModel.modelName, schema: SavingsGoalSchema }]), // Đảm bảo sử dụng model đúng
  ],
  providers: [SavingsGoalService],
  controllers: [SavingsGoalController],
})
export class SavingsGoalModule {}
