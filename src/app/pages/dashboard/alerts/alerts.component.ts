import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardAlert } from '../../../models/dashboard.model';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
  @Input() public alerts: DashboardAlert[] = [];
}
