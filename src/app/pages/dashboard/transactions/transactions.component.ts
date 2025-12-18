import { Component, Input } from '@angular/core';
import { RecentTransaction } from '../../../models/dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  @Input() public transactions: RecentTransaction[] = [];
}
