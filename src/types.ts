export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date | string;
}
