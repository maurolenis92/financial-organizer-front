import { Component, inject, OnInit } from '@angular/core';
import { DashboardData } from '../../models/dashboard.model';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions/transactions.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ActiveBudgetsComponent } from './active-budgets/active-budgets.component';
import { CategoryExpensesComponent } from './category-expenses/category-expenses.component';
import { TrendsComponent } from './trends/trends.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TransactionsComponent,
    AlertsComponent,
    ActiveBudgetsComponent,
    CategoryExpensesComponent,
    TrendsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public dashboardInformation!: DashboardData;
  private dashboardService = inject(DashboardService);
  public monthName: string = '';

  ngOnInit(): void {
    // Lógica para cargar los datos del dashboard
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardInformation = data;
      this.monthName = this.getmonthName(this.dashboardInformation.period.month);
    });
  }

  private getmonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('es-CO', { month: 'long' });
  }
}
