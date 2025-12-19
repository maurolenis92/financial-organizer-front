export interface DashboardPeriod {
  month: number;
  year: number;
}

export interface DashboardSummary {
  totalIncome: number;
  totalIncomeChange: number | null;
  totalExpenses: number;
  totalExpensesChange: number | null;
  available: number;
}

export interface ExpenseByCategory {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  total: number;
  percentage: number;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  amount: number;
}

export interface ActiveBudget {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpenses: number;
  percentageUsed: number;
  daysRemaining: number;
}

export interface RecentTransaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  categoryIcon: string | null;
  categoryColor: string | null;
  amount: number;
  status: string;
  createdAt: string;
  timeAgo: string;
}

export interface DashboardAlert {
  type: 'warning' | 'info' | 'error';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  budgetId: string;
}

export interface DashboardData {
  period: DashboardPeriod;
  summary: DashboardSummary;
  expensesByCategory: ExpenseByCategory[];
  monthlyTrend: MonthlyTrend[];
  activeBudgets: ActiveBudget[];
  recentTransactions: RecentTransaction[];
  alerts: DashboardAlert[];
}
