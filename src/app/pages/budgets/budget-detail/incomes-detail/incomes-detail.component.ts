import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Income } from '../../../../models/budget.model';

@Component({
  selector: 'app-incomes-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomes-detail.component.html',
  styleUrl: './incomes-detail.component.scss',
})
export class IncomesDetailComponent {
  @Input() public incomes: Income[] = [];
  @Input() public totalIncomes: number = 0;
  @Input() public currency!: string;
  @Output() public deleteIncome: EventEmitter<boolean> = new EventEmitter<boolean>();

  public deleteIncomeEntry(index: number): void {
    this.incomes.splice(index, 1);
    this.deleteIncome.emit(true);
  }
}
