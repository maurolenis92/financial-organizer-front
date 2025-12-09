import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { BudgetService } from '../../../../services/budget.service';
import { BudgetDetail, Category, Expense } from '../../../models/budget.model';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ExpensesDetailComponent } from './expenses-detail/expenses-detail.component';
import { IncomesDetailComponent } from './incomes-detail/incomes-detail.component';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ExpensesDetailComponent,
    IncomesDetailComponent,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.scss',
})
export class BudgetDetailComponent implements OnInit, OnDestroy {
  @Input() public id!: string;
  private router = inject(Router);
  private userService = inject(UserService);
  private budgetService = inject(BudgetService);
  private $destroy: Subject<void> = new Subject<void>();
  public budgetDetail!: BudgetDetail;
  public totalIncomes: number = 0;
  public totalExpenses: number = 0;
  public availableAmount: number = 0;
  public availableExpected: number = 0;
  public categories = this.userService.userCategories;
  public expenses: Expense[] = [];
  public form: FormGroup = new FormGroup({
    incomes: new FormArray([]),
    expenses: new FormArray([]),
  });
  public tabs = ['Todo', 'Ingresos', 'Gastos', 'Reportes'];

  ngOnInit(): void {
    console.log(this.id);
    this.getBudgetDetail();
    this.calculateTotals();
  }

  public getBudgetDetail(): void {
    this.budgetService.getBudgetById(this.id).subscribe(budget => {
      this.budgetDetail = budget;
      // this.expenses = budget.expenses;
      this.buildFormsArray();
    });
  }

  private calculateTotals(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        this.totalIncomes = value.incomes.reduce(
          (sum: number, income: any) => sum + Number(income.amount || 0),
          0
        );
        this.totalExpenses = value.expenses.reduce(
          (sum: number, expense: any) => sum + Number(expense.amount || 0),
          0
        );
        const expensesPaid = value.expenses
          .filter((expense: any) => expense.status.value === 'PAID')
          .reduce((sum: number, expense: any) => sum + Number(expense.amount || 0), 0);
        this.availableAmount = this.totalIncomes - expensesPaid;
        this.availableExpected =
          (this.budgetDetail.totalIncomes || 0) - (this.budgetDetail.totalExpenses || 0);
        this.expenses = value.expenses;
      });
  }

  public getExpenses(): Expense[] {
    return this.budgetDetail.expenses;
  }

  public goBack(): void {
    this.router.navigate(['dashboard/budgets']);
  }

  public tabChanged(event: any): void {
    console.log('Tab changed:', event);
  }

  public buildFormsArray(): void {
    this.budgetDetail.incomes.forEach(income => {
      (this.form.get('incomes') as FormArray).push(
        new FormGroup({
          concept: new FormControl(income.concept),
          amount: new FormControl(income.amount),
          id: new FormControl(income.id),
        })
      );
    });

    this.budgetDetail.expenses.forEach(expense => {
      (this.form.get('expenses') as FormArray).push(
        new FormGroup({
          concept: new FormControl(expense.concept),
          amount: new FormControl(expense.amount),
          categoryId: new FormControl(expense.categoryId),
          status: new FormControl(expense.status),
          id: new FormControl(expense.id),
        })
      );
    });
  }

  public categorieChange(event: MatChipSelectionChange, item: Category): void {
    if (event.selected) {
      this.expenses = this.budgetDetail.expenses.filter(
        expense => expense.categoryId === item.id
      );
    } else {
      this.expenses = this.budgetDetail.expenses;
    }
  }

  public getFormArray(type: 'incomes' | 'expenses'): FormArray {
    return this.form.get(type) as FormArray;
  }

  public getStatus(budget: BudgetDetail | undefined): string {
    if (!budget) return 'active';
    const remainingDays = this.getRemainingDays(budget);
    if (remainingDays <= 0) return 'expired';
    const percentageUsed = (budget.totalExpenses / budget.totalIncomes) * 100;
    if (percentageUsed >= 90) return 'critical';
    if (percentageUsed >= 70) return 'warning';
    return 'active';
  }

  public getStatusLabel(budget: BudgetDetail | undefined): string {
    const status = this.getStatus(budget);
    const labels = {
      expired: 'Vencido',
      critical: 'Crítico',
      warning: 'Alerta',
      active: 'Activo',
    };
    return labels[status as keyof typeof labels] || 'Activo';
  }

  public getRemainingDays(budget: BudgetDetail | undefined): number {
    if (!budget?.endDate) return 0;
    const end = new Date(budget.endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  public getCategoryIcon(categoryId: string): string {
    const category = this.categories().find(cat => cat.id === categoryId);
    return category?.icon || 'category';
  }

  public getExpenseStatus(status: any): string {
    // Si status es un objeto con value, usamos value, si es string directamente usamos el string
    const statusValue = typeof status === 'object' ? status?.value : status;
    return statusValue === 'PAID' ? 'paid' : 'pending';
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
