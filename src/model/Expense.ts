// models/Expense.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  date: Date;
  type: string;
  note: string;
}

const expenseSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  note: { type: String },
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', expenseSchema);
