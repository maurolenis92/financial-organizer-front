/* eslint-disable no-unused-vars */
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { BudgetService } from '../../../../services/budget.service';
import { BudgetDetail, Expense, Income } from '../../../models/budget.model';
import { CommonModule } from '@angular/common';
import { ExpensesDetailComponent } from './expenses-detail/expenses-detail.component';
import { IncomesDetailComponent } from './incomes-detail/incomes-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemBudgetModalComponent } from '../../../modals/create-item-budget-modal/create-item-budget-modal.component';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [
    CommonModule,
    ExpensesDetailComponent,
    IncomesDetailComponent,
    ButtonComponent,
    MatProgressBarModule,
    MatChipsModule,
  ],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.scss',
})
export class BudgetDetailComponent implements OnInit {
  @Input() public id!: string;
  private router = inject(Router);
  private userService = inject(UserService);
  private budgetService = inject(BudgetService);
  private dialog = inject(MatDialog);
  public budgetDetail!: BudgetDetail;
  public totalIncomes: number = 0;
  public totalExpenses: number = 0;
  public availableAmount: number = 0;
  public availableExpected: number = 0;
  public categories = this.userService.userCategories;
  public loading: boolean = false;

  ngOnInit(): void {
    this.getBudgetDetail();
  }

  public getBudgetDetail(): void {
    this.budgetService.getBudgetById(this.id).subscribe(budget => {
      this.budgetDetail = budget;
      this.calculateTotals();
      // this.expenses = budget.expenses;
    });
  }

  public calculateTotals(): void {
    this.totalIncomes =
      this.budgetDetail?.incomes.reduce((sum, income) => sum + income.amount, 0) || 0;
    this.totalExpenses =
      this.budgetDetail?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0;
    const paidExpenses =
      this.budgetDetail?.expenses
        .filter(expense => expense.status === 'PAID')
        .reduce((sum, expense) => sum + expense.amount, 0) || 0;
    this.availableAmount = this.totalIncomes - paidExpenses;
    this.availableExpected = this.totalIncomes - this.totalExpenses;
  }

  public goBack(): void {
    this.router.navigate(['dashboard/budgets']);
  }

  public addItem(isIncome: boolean): void {
    const dialogRef = this.dialog.open(CreateItemBudgetModalComponent, {
      data: { isIncome },
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        if (isIncome) {
          this.budgetDetail.incomes.push({
            id: this.generateTempId(),
            amount: val.amount,
            concept: val.concept,
          });
        } else {
          this.budgetDetail.expenses.push({
            id: this.generateTempId(),
            amount: val.amount,
            concept: val.concept,
            status: val.status.value,
            category: val.category,
            categoryId: val.categoryId.value,
          });
        }
        this.calculateTotals();
      }
    });
  }

  private generateTempId(): string {
    return `temp-${Date.now()}`;
  }

  public updateBudget(): void {
    this.loading = true;
    this.budgetDetail.expenses = this.budgetDetail.expenses.map(expense => {
      if (expense.id.includes('temp')) {
        const { id, ...expenseWithoutId } = expense;
        return {
          ...(expenseWithoutId as Expense),
        };
      }
      return expense;
    });
    this.budgetDetail.incomes = this.budgetDetail.incomes.map(income => {
      if (income.id.includes('temp')) {
        const { id, ...incomeWithoutId } = income;
        return {
          ...(incomeWithoutId as Income),
        };
      }
      return income;
    });

    this.budgetService
      .updateBudget(this.budgetDetail.id, this.budgetDetail)
      .subscribe(() => {
        this.getBudgetDetail();
        this.loading = false;
      });
  }
}
