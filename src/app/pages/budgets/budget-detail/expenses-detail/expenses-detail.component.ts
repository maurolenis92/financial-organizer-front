import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectInputComponent } from '../../../../components/select-input/select-input.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { MatChipsModule } from '@angular/material/chips';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SelectOption } from '../../../../models/select.model';
import { STATUS_OPTIONS } from '../../../../utils/constants/status-option.constant';

@Component({
  selector: 'app-expenses-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SelectInputComponent,
    ButtonComponent,
    MatChipsModule,
  ],
  templateUrl: './expenses-detail.component.html',
  styleUrl: './expenses-detail.component.scss',
})
export class ExpensesDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public form!: FormArray;
  @Input() public categories!: Category[];
  public formExpense: FormGroup = new FormGroup({
    concept: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  public categoriresOptions: SelectOption[] = [];
  public statusOptions = STATUS_OPTIONS;

  public buttonDisabled: boolean = true;

  private $destroy: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.categoriresOptions = this.categories.map(category => ({
      label: category.name,
      value: category.id,
    }));
    this.formExpense.statusChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = this.formExpense.status === 'INVALID';
      });
  }

  ngOnChanges(): void {
    this.categoriresOptions = this.categories.map(category => ({
      label: category.name,
      value: category.id,
    }));
  }

  public getControls(): AbstractControl[] {
    return this.form.controls;
  }

  public getGroup(index: number): FormGroup {
    return this.form.at(index) as FormGroup;
  }

  public addExpense(): void {
    this.form.push(
      new FormGroup({
        concept: new FormControl(this.formExpense.get('concept')?.value),
        amount: new FormControl(Number(this.formExpense.get('amount')?.value)),
        category: new FormControl(this.formExpense.get('category')?.value),
        categoryId: new FormControl(this.formExpense.get('category')?.value.value),
        status: new FormControl(this.formExpense.get('status')?.value.value),
        id: new FormControl(`temp-${Date.now()}`),
      })
    );
  }

  public removeExpense(index: number): void {
    this.form.removeAt(index);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
