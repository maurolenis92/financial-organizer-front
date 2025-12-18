import { Component, inject, OnInit } from '@angular/core';
import { DashboardData } from '../../models/dashboard.model';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { TransactionsComponent } from './transactions/transactions.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ActiveBudgetsComponent } from './active-budgets/active-budgets.component';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  colors: string[];
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    TransactionsComponent,
    AlertsComponent,
    ActiveBudgetsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public dashboardInformation!: DashboardData;
  private dashboardService = inject(DashboardService);
  public pieChartOptions!: Partial<PieChartOptions>;
  public monthName: string = '';
  public lineChartOptions!: Partial<LineChartOptions>;

  ngOnInit(): void {
    // Lógica para cargar los datos del dashboard
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardInformation = data;
      this.monthName = this.getmonthName(this.dashboardInformation.period.month);
      this.initPieChart();
      this.initLineChart();
    });
  }

  private initPieChart(): void {
    this.pieChartOptions = {
      series: this.dashboardInformation.expensesByCategory.map(item => item.total),
      chart: {
        type: 'donut',
        height: 250,
        background: 'transparent',
        foreColor: '#ffffff',
      },
      labels: this.dashboardInformation.expensesByCategory.map(item => item.categoryName),
      colors: this.dashboardInformation.expensesByCategory.map(
        item => item.categoryColor
      ),
      legend: {
        position: 'right',
        labels: {
          colors: '#ffffff',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number): string {
          return Math.round(val) + '%';
        },
        style: {
          colors: ['#ffffff'],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private initLineChart(): void {
    this.lineChartOptions = {
      series: [
        {
          name: 'Gastos',
          data: this.dashboardInformation.monthlyTrend.map(item => item.amount),
        },
      ],
      chart: {
        type: 'line',
        height: 250,
        background: 'transparent',
        foreColor: '#ffffff',
        toolbar: {
          show: false,
        },
      },
      colors: ['#00ff88'],
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: this.dashboardInformation.monthlyTrend.map(item => item.month),
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
          },
          formatter: (val: number): string => {
            return '$' + (val / 1000000).toFixed(1) + 'M';
          },
        },
      },
      grid: {
        borderColor: '#1a2f26',
        strokeDashArray: 4,
      },
    };
  }

  private getmonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('es-CO', { month: 'long' });
  }
}
