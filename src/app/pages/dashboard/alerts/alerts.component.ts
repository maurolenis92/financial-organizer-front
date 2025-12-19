import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DashboardAlert } from '../../../models/dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
  @Input() public alerts: DashboardAlert[] = [];
  private router = inject(Router);

  public navigateToAlertDetails(alertId: string): void {
    this.router.navigate([`/dashboard/budgets/${alertId}`]);
  }
}
