// TODO: PENDING REVIEW
/* eslint-disable no-unused-vars */
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetInfoStepComponent } from './steps/budget-info-step/budget-info-step.component';
import { BudgetIncomesStepComponent } from './steps/budget-incomes-step/budget-incomes-step.component';
import { BudgetExpensesStepComponent } from './steps/budget-expenses-step/budget-expenses-step.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Category } from '../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { BudgetDetail } from '../../../models/budget.model';
import { BudgetService } from '../../../../services/budget.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-budget',
  standalone: true,
  imports: [
    CommonModule,
    BudgetInfoStepComponent,
    BudgetIncomesStepComponent,
    BudgetExpensesStepComponent,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './new-budget.component.html',
  styleUrl: './new-budget.component.scss',
})
export class NewBudgetComponent implements OnInit {
  public steps = [
    {
      title: 'Información',
      enabled: true,
      completed: false,
      stepIndex: 0,
      component: 'BudgetInfoStepComponent',
    },
    {
      title: 'Ingresos',
      enabled: false,
      completed: false,
      stepIndex: 1,
      component: 'BudgetIncomesStepComponent',
    },
    {
      title: 'Gastos',
      enabled: false,
      completed: false,
      stepIndex: 2,
      component: 'BudgetExpensesStepComponent',
    },
  ];

  public currentStepIndex: number = 0;
  public buttonText: string = 'Siguiente';
  public loading: boolean = false;
  public totalIncomes: number = 0;
  public totalExpenses: number = 0;
  public currencySelected: string = 'COP';

  public budgetForm: FormGroup = new FormGroup({
    info: new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    }),
    incomes: new FormArray([]),
    expenses: new FormArray([]),
  });
  private userService = inject(UserService);
  private budgetService = inject(BudgetService);
  private $destroy: Subject<void> = new Subject<void>();
  private router = inject(Router);
  public categories: Category[] = [];
  public buttonDisabled: boolean = true;

  constructor() {
    effect(() => {
      this.categories = this.userService.userCategories();
    });
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe();
    this.budgetForm.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = !this.validStep();
      });
    this.budgetForm
      .get('info')
      ?.get('currency')
      ?.valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(currency => {
        this.currencySelected = currency?.value;
      });
    this.budgetForm
      .get('incomes')
      ?.valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(incomes => {
        this.totalIncomes = incomes.reduce(
          (total: number, income: any) => total + Number(income.amount || 0),
          0
        );
      });

    this.budgetForm
      .get('expenses')
      ?.valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(expenses => {
        this.totalExpenses = expenses.reduce(
          (total: number, expense: any) => total + Number(expense.amount || 0),
          0
        );
      });
  }

  public getInfoFormGroup(): FormGroup {
    return this.budgetForm.get('info') as FormGroup;
  }

  public goToStep(stepIndex: number): void {
    if (this.steps[stepIndex].enabled) {
      this.currentStepIndex = stepIndex;
    }
    this.validateStepText();
  }

  public nextStep(): void {
    if (this.currentStepIndex === this.steps.length - 1) {
      this.saveBudget();
      return;
    }
    if (this.currentStepIndex < this.steps.length - 1) {
      this.steps[this.currentStepIndex].completed = true;
      this.currentStepIndex++;
      this.steps[this.currentStepIndex].enabled = true;
    }
    this.validateStepText();
  }

  private saveBudget(): void {
    // Logic to save the budget goes here
    console.log('Budget saved:', this.budgetForm.value);
    const budgetData: Partial<BudgetDetail> = {
      name: this.budgetForm.get('info')?.get('name')?.value,
      currency: this.budgetForm.get('info')?.get('currency')?.value.value,
      startDate: this.budgetForm.get('info')?.get('startDate')?.value,
      endDate: this.budgetForm.get('info')?.get('endDate')?.value,
      incomes: this.budgetForm.get('incomes')?.value,
      expenses: this.budgetForm.get('expenses')?.value.map((ex: any) => ({
        ...ex,
        category: this.categories.find(cat => cat.id === ex.category.value)!,
      })),
    };

    budgetData.expenses = budgetData.expenses?.map(expense => {
      if (expense.category.id.includes('temp')) {
        const { id, ...categoryWithoutId } = expense.category;
        return {
          ...expense,
          category: categoryWithoutId as Category,
        };
      }
      return expense;
    });
    this.loading = true;
    this.budgetService.createBudget(budgetData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['dashboard/budgets']);
        // Additional logic after successful budget creation can go here
      },
      error: error => {
        console.error('Error creating budget:', error);
        this.loading = false;
      },
    });
  }

  private validateStepText(): void {
    this.buttonText =
      this.currentStepIndex === this.steps.length - 1 ? 'Finalizar' : 'Siguiente';
  }

  public previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
    this.validateStepText();
  }

  public getFormArray(value: string): FormArray {
    return this.budgetForm.get(value) as FormArray;
  }

  public validStep(): boolean {
    switch (this.currentStepIndex) {
      case 0:
        return this.getInfoFormGroup().valid;
      case 1:
        return this.getFormArray('incomes').length > 0;
      case 2:
        return this.getFormArray('expenses').length > 0;
      default:
        return false;
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
