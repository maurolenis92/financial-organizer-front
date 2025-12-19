import { Component, Input, OnInit } from '@angular/core';
import { MonthlyTrend } from '../../../models/dashboard.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.scss',
})
export class TrendsComponent implements OnInit {
  @Input() public monthlyTrend: MonthlyTrend[] = [];
  public lineChartOptions!: Partial<LineChartOptions>;

  ngOnInit(): void {
    this.initLineChart();
  }

  private initLineChart(): void {
    this.lineChartOptions = {
      series: [
        {
          name: 'Gastos',
          data: this.monthlyTrend.map(item => item.amount),
        },
      ],
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val): string {
            return '$' + val.toLocaleString();
          },
        },
      },
      chart: {
        type: 'line',
        height: 250,
        background: 'transparent',
        foreColor: '#ffffff',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
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
        categories: this.monthlyTrend.map(item => item.month),
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
}
