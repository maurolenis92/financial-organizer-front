import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public totalBalance: number = 15420.5;
  public monthlyIncome: number = 4500.0;
  public monthlyExpenses: number = 3280.75;
  public savingsGoal: number = 10000.0;
  public currentSavings: number = 6750.25;

  public get savingsProgress(): number {
    return (this.currentSavings / this.savingsGoal) * 100;
  }

  public get netIncome(): number {
    return this.monthlyIncome - this.monthlyExpenses;
  }
}
