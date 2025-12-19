import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../../components/input/input.component';
import { SelectInputComponent } from '../../../../../components/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectOption } from '../../../../../models/select.model';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { STATUS_OPTIONS } from '../../../../../utils/constants/status-option.constant';
import { scrollToTop } from '../../../../../utils/functions.util';
import { Category } from '../../../../../models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { ScreenSizeService } from '../../../../../../services/screen-size.service';

@Component({
  selector: 'app-budget-expenses-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    InputComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './budget-expenses-step.component.html',
  styleUrl: './budget-expenses-step.component.scss',
})
export class BudgetExpensesStepComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public formArray!: FormArray;
  @Input() public selectedCurrency: string = 'COP';
  @Input() public categoriesInput: Category[] = [];

  public categories: SelectOption[] = [];
  public statuses: SelectOption[] = STATUS_OPTIONS;
  public isMobile: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();
  private screenSizeService = inject(ScreenSizeService);

  constructor() {
    this.screenSizeService.screenSize$.pipe(takeUntil(this.destroy$)).subscribe(size => {
      this.isMobile = size.isMobile || size.isTablet;
    });
  }

  ngOnInit(): void {
    scrollToTop();
  }

  ngOnChanges(): void {
    this.categories = [
      ...this.categoriesInput.map(cat => ({ label: cat.name, value: cat.id })),
    ];
  }

  public getControls(): AbstractControl[] {
    return this.formArray.controls;
  }

  public getGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  public addExpense(): void {
    this.formArray.push(
      new FormGroup({
        amount: new FormControl('', Validators.required),
        concept: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
      })
    );
  }

  public removeExpense(index: number): void {
    this.formArray.removeAt(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
