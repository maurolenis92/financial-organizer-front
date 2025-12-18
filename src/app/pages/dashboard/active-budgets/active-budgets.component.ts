import { Component, Input } from '@angular/core';
import { ActiveBudget } from '../../../models/dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-budgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-budgets.component.html',
  styleUrl: './active-budgets.component.scss',
})
export class ActiveBudgetsComponent {
  @Input() public budgets: ActiveBudget[] = [];
}
