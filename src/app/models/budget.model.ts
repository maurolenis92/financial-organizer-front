import { Category } from './user.model';

export type { Category };

export interface Budget {
  id: string;
  startDate: Date;
  endDate: Date;
  currency: string;
  totalIncomes: number;
  totalExpenses: number;
  availableMoney: number;
  percentageUsed: number;
  daysRemaining: number;
  name: string;
}

export interface BudgetDetail extends Budget {
  totalPaidExpenses: number;
  incomes: Income[];
  expenses: Expense[];
  incomesCount: number;
  expensesCount: number;
}

export interface BudgetState {
  budgets: Budget[];
  activeBudgetId: string | null;
}

export interface Income {
  id: string;
  amount: number;
  concept: string;
}

export interface Expense {
  id: string;
  amount: number;
  concept: string;
  category: Category;
  categoryId: string;
  status: string;
}
