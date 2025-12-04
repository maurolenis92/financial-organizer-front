import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ButtonComponent } from '../../../../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { scrollToTop } from '../../../../../utils/functions.util';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budget-incomes-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './budget-incomes-step.component.html',
  styleUrl: './budget-incomes-step.component.scss',
})
export class BudgetIncomesStepComponent implements OnInit, OnDestroy {
  @Input() public formArray!: FormArray;
  @Input() public selectedCurrency: string = 'COP';
  public formIncome: FormGroup = new FormGroup({
    amount: new FormControl('', Validators.required),
    concept: new FormControl('', Validators.required),
  });
  public buttonDisabled: boolean = true;
  private $destroy: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    scrollToTop();
    this.formIncome.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = this.formIncome.invalid;
      });
  }

  public addIncome(): void {
    this.formArray.push(
      new FormGroup({
        amount: new FormControl(this.formIncome.get('amount')?.value),
        concept: new FormControl(this.formIncome.get('concept')?.value),
      })
    );
    this.formIncome.reset();
  }

  public getControls(): AbstractControl[] {
    return this.formArray.controls;
  }

  public removeIncome(index: number): void {
    this.formArray.removeAt(index);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
