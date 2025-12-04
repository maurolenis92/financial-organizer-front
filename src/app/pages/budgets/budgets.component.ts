import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { BudgetService } from '../../../services/budget.service';
import { GenericCardComponent } from '../../components/generic-card/generic-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    SelectInputComponent,
    DatePickerComponent,
    GenericCardComponent,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit {
  private budgetService = inject(BudgetService);
  private router = inject(Router);
  public form: FormGroup = new FormGroup({
    budgetName: new FormControl(''),
    category: new FormControl(''),
    startDate: new FormControl(''),
  });
  public budgets$ = this.budgetService.budgets;

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe();
    this.form.valueChanges.subscribe(value => {
      console.log('Form changes:', value);
    });
  }

  public newBudget(): void {
    this.router.navigate(['dashboard/budgets/new']);
  }
}
