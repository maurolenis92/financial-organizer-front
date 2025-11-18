import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Budget {
  id: number;
  name: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent {
  public budgets: Budget[] = [
    {
      id: 1,
      name: 'Alimentación',
      category: 'Necesidades',
      allocated: 800,
      spent: 520.3,
      color: '#10b981',
    },
    {
      id: 2,
      name: 'Transporte',
      category: 'Necesidades',
      allocated: 300,
      spent: 285.5,
      color: '#f59e0b',
    },
    {
      id: 3,
      name: 'Entretenimiento',
      category: 'Deseos',
      allocated: 200,
      spent: 150.75,
      color: '#7c3aed',
    },
    {
      id: 4,
      name: 'Servicios',
      category: 'Necesidades',
      allocated: 450,
      spent: 425.0,
      color: '#ef4444',
    },
    {
      id: 5,
      name: 'Ahorros',
      category: 'Meta',
      allocated: 600,
      spent: 600.0,
      color: '#06b6d4',
    },
  ];

  public getProgressPercentage(budget: Budget): number {
    return (budget.spent / budget.allocated) * 100;
  }

  public getRemainingAmount(budget: Budget): number {
    return budget.allocated - budget.spent;
  }

  public getBudgetStatus(budget: Budget): 'success' | 'warning' | 'danger' {
    const percentage = this.getProgressPercentage(budget);
    if (percentage <= 75) return 'success';
    if (percentage <= 90) return 'warning';
    return 'danger';
  }

  public getTotalAllocated(): number {
    return this.budgets.reduce((total, budget) => total + budget.allocated, 0);
  }

  public getTotalSpent(): number {
    return this.budgets.reduce((total, budget) => total + budget.spent, 0);
  }

  public getTotalRemaining(): number {
    return this.getTotalAllocated() - this.getTotalSpent();
  }
}
