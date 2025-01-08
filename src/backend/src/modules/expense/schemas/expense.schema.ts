import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Category' })
  categoryId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: Date })
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
