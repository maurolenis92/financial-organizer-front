import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { BudgetService } from '../../../services/budget.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit {
  private budgetService = inject(BudgetService);
  private userService = inject(UserService);
  private router = inject(Router);
  public budgets$ = this.budgetService.budgets;

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe();
    this.userService.getUserProfile().subscribe();
  }

  public newBudget(): void {
    this.router.navigate(['dashboard/budgets/new']);
  }

  public viewBudget(id: string): void {
    this.router.navigate(['dashboard/budgets', id]);
  }

  public getStatus(budget: any): string {
    if (budget.daysRemaining <= 0) return 'expired';
    if (budget.percentageUsed >= 90) return 'critical';
    if (budget.percentageUsed >= 70) return 'warning';
    return 'active';
  }

  public getStatusLabel(budget: any): string {
    const status = this.getStatus(budget);
    const labels: Record<string, string> = {
      expired: 'Vencido',
      critical: 'Crítico',
      warning: 'Alerta',
      active: 'Activo',
    };
    return labels[status];
  }

  public getProgressColor(budget: any): string {
    const status = this.getStatus(budget);
    const colors: Record<string, string> = {
      expired: '#71717a',
      critical: '#ef4444',
      warning: '#f59e0b',
      active: '#10b981',
    };
    return colors[status];
  }

  public getProgressBarColor(budget: any): 'primary' | 'accent' | 'warn' {
    if (budget.percentageUsed >= 90) return 'warn';
    if (budget.percentageUsed >= 70) return 'accent';
    return 'primary';
  }

  public deleteBudget(id: string, name: string): void {
    if (confirm(`¿Estás seguro de eliminar el presupuesto "${name}"?`)) {
      // TODO: Implementar llamada al servicio para eliminar
      console.log('Eliminar presupuesto:', id);
      this.budgetService.deleteBudget(id).subscribe(() => {
        this.budgetService.getBudgets().subscribe();
      });
    }
  }

  public duplicateBudget(budget: any): void {
    // TODO: Implementar lógica para duplicar presupuesto
    console.log('Duplicar presupuesto:', budget);
  }
}
