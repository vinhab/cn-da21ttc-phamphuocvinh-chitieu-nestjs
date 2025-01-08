import { IsString, IsNumber } from 'class-validator';

export class CreateSavingsGoalDto {
  @IsString()
  userId: string;

  @IsNumber()
  targetAmount: number;

  @IsString()
  monthYear: string;
}
