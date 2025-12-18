import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Expense } from '../../../../models/budget.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-expenses-detail',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatChipsModule],
  templateUrl: './expenses-detail.component.html',
  styleUrl: './expenses-detail.component.scss',
})
export class ExpensesDetailComponent {
  @Input() public expenses: Expense[] = [];
  @Input() public categories!: Category[];
  @Input() public totalExpenses: number = 0;
  @Input() public currency!: string;
  @Output() public update: EventEmitter<boolean> = new EventEmitter<boolean>();

  public updateExpense(index: number): void {
    const expense = this.expenses[index];
    expense.status = expense.status === 'PENDING' ? 'PAID' : 'PENDING';
    this.update.emit(true);
  }

  public deleteExpense(index: number): void {
    this.expenses.splice(index, 1);
    this.update.emit(true);
  }
}
