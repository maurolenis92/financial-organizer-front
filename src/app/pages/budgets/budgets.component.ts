import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { BudgetService } from '../../../services/budget.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    SelectInputComponent,
    DatePickerComponent,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit {
  private budgetService = inject(BudgetService);
  private router = inject(Router);
  public form: FormGroup = new FormGroup({
    budgetName: new FormControl(''),
    category: new FormControl(''),
    startDate: new FormControl(''),
  });
  public budgets$ = this.budgetService.budgets;

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe();
    this.form.valueChanges.subscribe(value => {
      console.log('Form changes:', value);
    });
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
    }
  }

  public duplicateBudget(budget: any): void {
    // TODO: Implementar lógica para duplicar presupuesto
    console.log('Duplicar presupuesto:', budget);
  }
}
