import { Component, Input, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ExpenseByCategory } from '../../../models/dashboard.model';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-category-expenses',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './category-expenses.component.html',
  styleUrl: './category-expenses.component.scss',
})
export class CategoryExpensesComponent implements OnInit {
  @Input() public expensesByCategory: ExpenseByCategory[] = [];
  public pieChartOptions!: Partial<PieChartOptions>;

  ngOnInit(): void {
    this.initPieChart();
  }

  private initPieChart(): void {
    this.pieChartOptions = {
      series: this.expensesByCategory.map(item => item.total),
      tooltip: {
        y: {
          formatter: function (val): string {
            return '$' + val.toLocaleString();
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%', // Tamaño del hueco (50% = mitad, 90% = muy delgado)

            // Contenido en el centro
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontWeight: 600,
                color: '#ffffff',
                offsetY: -10,
                formatter: function (val): string {
                  return val; // Nombre de la categoría
                },
              },
              value: {
                show: true,
                fontSize: '16px',
                color: '#00ff88',
                offsetY: 10,
                formatter: function (val): string {
                  return '$' + parseInt(val).toLocaleString();
                },
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                formatter: function (w): string {
                  return (
                    '$' +
                    w.globals.seriesTotals
                      .reduce((a: any, b: any) => a + b, 0)
                      .toLocaleString()
                  );
                },
              },
            },
          },
        },
      },
      chart: {
        type: 'donut',
        height: 250,
        background: 'transparent',
        foreColor: '#ffffff',
      },
      stroke: {
        show: false,
      },
      labels: this.expensesByCategory.map(item => item.categoryName),
      colors: this.expensesByCategory.map(item => item.categoryColor),
      legend: {
        position: 'right',
        labels: {
          colors: '#ffffff',
        },
        markers: {
          strokeWidth: 0,
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
}
