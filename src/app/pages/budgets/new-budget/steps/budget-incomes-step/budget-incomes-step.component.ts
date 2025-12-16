import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class BudgetIncomesStepComponent implements OnInit {
  @Input() public formArray!: FormArray;
  @Input() public selectedCurrency: string = 'COP';

  ngOnInit(): void {
    scrollToTop();
  }

  public addIncome(): void {
    this.formArray.push(
      new FormGroup({
        amount: new FormControl('', Validators.required),
        concept: new FormControl('', Validators.required),
      })
    );
  }

  public getControls(): AbstractControl[] {
    return this.formArray.controls;
  }

  public getGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  public removeIncome(index: number): void {
    this.formArray.removeAt(index);
  }
}
